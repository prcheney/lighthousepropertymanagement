import { put } from "@vercel/blob";

const LIVE_SITE = "https://jaxpm.conversionpartners.net";
const BLOB_BASE = "https://r2hd6enfeuk3nxlh.public.blob.vercel-storage.com/jaxpm/images";

const imagePaths = [
  { key: "logo", filename: "logo.png" },
  { key: "heroBg", filename: "hero-bg.jpg" },
  { key: "serviceResidential", filename: "service-residential.jpg" },
  { key: "serviceVacation", filename: "service-vacation.jpg" },
  { key: "serviceInvestor", filename: "service-investor.jpg" },
  { key: "serviceTenant", filename: "service-tenant.jpg" },
  { key: "serviceMaintenance", filename: "service-maintenance.jpg" },
  { key: "serviceFinancial", filename: "service-financial.jpg" },
  { key: "whyUs", filename: "why-us.jpg" },
  { key: "painPoints", filename: "pain-points.jpg" },
  { key: "rentalAnalysis", filename: "rental-analysis-report.jpg" },
  { key: "contact", filename: "contact.jpg" },
];

async function tryFetch(url) {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      redirect: "follow",
    });
    if (!response.ok) return null;
    const ct = response.headers.get("content-type") || "";
    if (ct.includes("text/html")) return null;
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length < 1000) return null;
    return { buffer, contentType: ct || "image/jpeg" };
  } catch {
    return null;
  }
}

async function uploadImages() {
  const results = {};

  for (const img of imagePaths) {
    // Try live site first, then old blob storage
    const urls = [
      `${LIVE_SITE}/images/${img.filename}`,
      `${BLOB_BASE}/${img.filename}`,
    ];

    let downloaded = null;
    let sourceUrl = "";

    for (const url of urls) {
      console.log(`  Trying: ${url}`);
      downloaded = await tryFetch(url);
      if (downloaded) {
        sourceUrl = url;
        break;
      }
    }

    if (!downloaded) {
      console.error(`FAILED: ${img.key} - could not download from any source`);
      continue;
    }

    console.log(`Downloaded ${img.key} (${downloaded.buffer.length} bytes) from ${sourceUrl}`);

    const blobPath = `jaxpm/images/${img.filename}`;
    console.log(`Uploading to Blob: ${blobPath}`);

    const blob = await put(blobPath, downloaded.buffer, {
      access: "public",
      contentType: downloaded.contentType,
      addRandomSuffix: false,
    });

    results[img.key] = blob.url;
    console.log(`Uploaded: ${img.key} -> ${blob.url}\n`);
  }

  console.log("\n--- BLOB URLS ---");
  console.log(JSON.stringify(results, null, 2));

  // Output the image-urls.ts content for easy copy
  console.log("\n--- image-urls.ts content ---");
  console.log('export const images = {');
  for (const img of imagePaths) {
    if (results[img.key]) {
      console.log(`  ${img.key}: "${results[img.key]}",`);
    }
  }
  console.log('} as const;');
}

uploadImages().catch(console.error);
