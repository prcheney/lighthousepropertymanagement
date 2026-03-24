import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { readFileSync } from "fs";
import { join } from "path";
import { buildReportHTML } from "@/lib/pdf/template";

const GHL_WEBHOOK =
  "https://services.leadconnectorhq.com/hooks/GxxmZBnjTGnUy9yDC0QW/webhook-trigger/fCyfkCOIcCy9Qq7VNtcs";

const RENTCAST_KEY = process.env.RENTCAST_API_KEY!;
const MAPS_KEY = process.env.GOOGLE_MAPS_API_KEY!;
const USE_MOCK = process.env.MOCK_RENTCAST === "true";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US").format(Math.round(n));
}

function loadFixture() {
  const fixturePath = join(process.cwd(), "lib", "rentcast-fixture.json");
  return JSON.parse(readFileSync(fixturePath, "utf-8"));
}

async function fetchRentcast(path: string) {
  const res = await fetch(`https://api.rentcast.io/v1${path}`, {
    headers: { "X-Api-Key": RENTCAST_KEY },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

async function fetchImageBase64(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) return "";
  const buf = await res.arrayBuffer();
  return Buffer.from(buf).toString("base64");
}

async function getExecPath(): Promise<string> {
  if (process.platform === "darwin") {
    return "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  }
  const chromium = (await import("@sparticuz/chromium")).default;
  return chromium.executablePath();
}

async function getLaunchArgs(): Promise<string[]> {
  if (process.platform === "darwin") {
    return ["--no-sandbox", "--disable-setuid-sandbox"];
  }
  const chromium = (await import("@sparticuz/chromium")).default;
  return chromium.args;
}

async function generatePDF(html: string): Promise<Buffer> {
  const puppeteer = (await import("puppeteer-core")).default;

  const browser = await puppeteer.launch({
    args: await getLaunchArgs(),
    defaultViewport: { width: 816, height: 1056 },
    executablePath: await getExecPath(),
    headless: true,
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdf = await page.pdf({
      format: "Letter",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, address, propertyType, message, source } = body;

  const encoded = encodeURIComponent(address);

  let propertyData: any = null;
  let rentRaw: any = null;
  let comparables: Array<{
    formattedAddress: string;
    bedrooms?: number;
    bathrooms?: number;
    squareFootage?: number;
    price: number;
    daysOnMarket?: number;
    latitude?: number;
    longitude?: number;
  }> = [];
  let marketRaw: any = null;

  if (USE_MOCK) {
    // ── Mock mode: use cached fixture, no API calls ────────────────────
    const fixture = loadFixture();
    propertyData = fixture.properties[0] ?? null;
    rentRaw = fixture.rent ?? null;
    comparables = fixture.comparables ?? [];
    marketRaw = fixture.market ?? null;
    console.log("[MOCK] Using Rentcast fixture data — no API calls made");
  } else {
    // ── 1. Fetch property + AVM in parallel ────────────────────────────
    const [propertiesRaw, rentRawLive] = await Promise.all([
      fetchRentcast(`/properties?address=${encoded}&limit=1`),
      fetchRentcast(`/avm/rent?address=${encoded}`),
    ]);

    propertyData = Array.isArray(propertiesRaw)
      ? (propertiesRaw[0] ?? null)
      : propertiesRaw ?? null;

    rentRaw = rentRawLive;

    const zc = propertyData?.zipCode ?? null;
    const beds = propertyData?.bedrooms ?? null;
    const pt: string = propertyData?.propertyType ?? "Single Family";

    // ── 2. Fetch comparables + market in parallel ──────────────────────
    const [comparablesRaw, marketRawLive] = await Promise.all([
      zc
        ? fetchRentcast(
            `/listings/rental/long-term?zipCode=${zc}` +
              `&propertyType=${encodeURIComponent(pt)}` +
              (beds ? `&bedrooms=${beds}` : "") +
              `&status=Active&limit=8`
          )
        : null,
      zc ? fetchRentcast(`/markets?zipCode=${zc}`) : null,
    ]);

    comparables = (Array.isArray(comparablesRaw) ? comparablesRaw : []).map(
      (c: any) => ({
        formattedAddress: c.formattedAddress as string,
        bedrooms: c.bedrooms as number | undefined,
        bathrooms: c.bathrooms as number | undefined,
        squareFootage: c.squareFootage as number | undefined,
        price: c.price as number,
        daysOnMarket: c.daysOnMarket as number | undefined,
        latitude: c.latitude as number | undefined,
        longitude: c.longitude as number | undefined,
      })
    );

    marketRaw = marketRawLive;
  }

  const zipCode = propertyData?.zipCode ?? null;
  const lat: number | null = propertyData?.latitude ?? null;
  const lng: number | null = propertyData?.longitude ?? null;
  const propTypeRentcast: string = propertyData?.propertyType ?? "Single Family";

  // ── 3. Resolve rent estimate ───────────────────────────────────────────
  let rentData = null as {
    rent: number;
    rentRangeLow: number;
    rentRangeHigh: number;
    fromComparables: boolean;
  } | null;

  if (rentRaw?.rent) {
    rentData = {
      rent: rentRaw.rent,
      rentRangeLow: rentRaw.rentRangeLow,
      rentRangeHigh: rentRaw.rentRangeHigh,
      fromComparables: false,
    };
  } else if (comparables.length > 0) {
    const prices = comparables.map((c) => c.price).sort((a, b) => a - b);
    const median = prices[Math.floor(prices.length / 2)];
    rentData = {
      rent: median,
      rentRangeLow: Math.round(median * 0.9),
      rentRangeHigh: Math.round(median * 1.1),
      fromComparables: true,
    };
  }

  // ── 4. Extract market stats ────────────────────────────────────────────
  let marketData = null as {
    medianRent?: number;
    averageDaysOnMarket?: number;
    totalListings?: number;
    medianRentPerSquareFoot?: number;
  } | null;

  if (marketRaw?.rentalData) {
    const byType = marketRaw.rentalData.dataByPropertyType?.find(
      (d: any) => d.propertyType === propTypeRentcast
    );
    const src = byType ?? marketRaw.rentalData;
    marketData = {
      medianRent: src.medianRent,
      averageDaysOnMarket: src.averageDaysOnMarket,
      totalListings: src.totalListings,
      medianRentPerSquareFoot: src.medianRentPerSquareFoot,
    };
  }

  // ── 5. Build image URLs ────────────────────────────────────────────────
  const streetViewUrl =
    `https://maps.googleapis.com/maps/api/streetview` +
    `?size=800x300&location=${encoded}&fov=90&pitch=5&key=${MAPS_KEY}`;

  // Map: subject (gold) + comp pins (navy), auto-fit
  const markerParams: string[] = [];
  if (lat && lng) {
    markerParams.push(
      `markers=color:0xC9A84C%7Clabel:P%7C${lat},${lng}`
    );
  }
  comparables.slice(0, 6).forEach((c, i) => {
    if (c.latitude && c.longitude) {
      markerParams.push(
        `markers=color:0x0D1F2D%7Clabel:${i + 1}%7C${c.latitude},${c.longitude}`
      );
    }
  });
  const mapUrl =
    `https://maps.googleapis.com/maps/api/staticmap` +
    `?size=460x280&scale=2&maptype=roadmap&style=feature:poi%7Cvisibility:off` +
    (markerParams.length > 0 ? `&${markerParams.join("&")}` : `&center=${encoded}&zoom=13`) +
    `&key=${MAPS_KEY}`;

  // ── 6. Fetch images + logo in parallel ────────────────────────────────
  const logoPath = join(process.cwd(), "public", "images", "logo.png");
  const logoBase64 = readFileSync(logoPath).toString("base64");

  const [streetViewBase64, mapBase64] = await Promise.all([
    fetchImageBase64(streetViewUrl),
    fetchImageBase64(mapUrl),
  ]);

  // ── 7. Build HTML + render PDF ────────────────────────────────────────
  const generatedDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  let pdfUrl: string | null = null;

  try {
    const html = buildReportHTML({
      name,
      address,
      generatedDate,
      logoBase64,
      streetViewBase64,
      mapBase64,
      propertyData,
      rentData,
      comparables,
      marketData,
    });

    const pdfBuffer = await generatePDF(html);

    const slug = address
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .slice(0, 40);

    const blob = await put(
      `rental-reports/${slug}-${Date.now()}.pdf`,
      pdfBuffer,
      { access: "public", contentType: "application/pdf" }
    );

    pdfUrl = blob.url;
  } catch (err) {
    console.error("PDF generation failed:", err);
  }

  // ── 8. Forward to GHL ─────────────────────────────────────────────────
  await fetch(GHL_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      phone,
      address,
      propertyType,
      message,
      source,
      pdf_url: pdfUrl ?? "",
      estimated_rent: rentData?.rent ? `$${fmt(rentData.rent)}/mo` : "",
      rent_range:
        rentData?.rentRangeLow && rentData?.rentRangeHigh
          ? `$${fmt(rentData.rentRangeLow)} – $${fmt(rentData.rentRangeHigh)}`
          : "",
    }),
  }).catch((err) => console.error("GHL webhook failed:", err));

  return NextResponse.json({ success: true, pdf_url: pdfUrl });
}
