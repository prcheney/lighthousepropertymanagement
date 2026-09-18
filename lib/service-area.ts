/**
 * Lighthouse PM service area.
 *
 * Scope decided by Paul 2026-09-18: Duval + Clay + St Johns counties.
 * Used to gate the Meta `Lead` pixel event on /fb, so Meta only ever optimizes
 * toward properties Stephanie can actually manage. The campaign geo lock targets
 * where the PERSON is; this checks where the PROPERTY is. Those are different
 * things and only the second one qualifies a lead.
 *
 * This must stay post-click. Never turn it into ad-set ZIP targeting or
 * exclusion - that is what triggered the 2026-08-21 Meta Page restriction.
 */

export const SERVICE_AREA_COUNTIES = ["duval", "clay", "st johns"];

/**
 * Every ZIP in the three counties, including PO Box and unique ZIPs that a
 * ZCTA-based list leaves out (32081 Nocatee and 32080 St Augustine Beach among
 * them). Source: scpike/us-state-county-zip crosswalk, supplemented and each
 * addition verified against the USPS ZIP lookup 2026-09-18.
 */
export const SERVICE_AREA_ZIPS = new Set<string>([
  // Duval - Jacksonville, Jacksonville Beach, Atlantic Beach, Neptune Beach, Baldwin
  "32099", "32201", "32202", "32203", "32204", "32205", "32206", "32207",
  "32208", "32209", "32210", "32211", "32212", "32214", "32215", "32216",
  "32217", "32218", "32219", "32220", "32221", "32222", "32223", "32224",
  "32225", "32226", "32227", "32228", "32229", "32231", "32232", "32233",
  "32234", "32235", "32236", "32237", "32238", "32239", "32240", "32241",
  "32244", "32245", "32246", "32247", "32250", "32254", "32255", "32256",
  "32257", "32258", "32260", "32266", "32267", "32277",
  // Clay - Orange Park, Fleming Island, Middleburg, Green Cove Springs, Keystone Heights
  "32003", "32006", "32030", "32043", "32050", "32065", "32067", "32068",
  "32073", "32079", "32656",
  // St Johns - St Augustine, Ponte Vedra, Nocatee, Fruit Cove, Hastings, Elkton
  "32004", "32033", "32080", "32081", "32082", "32084", "32085", "32086",
  "32092", "32095", "32145", "32259",
]);

/** "St. Johns County" / "Saint Johns" / "ST JOHNS" all collapse to "st johns". */
export function normalizeCounty(county: string): string {
  return county
    .toLowerCase()
    .replace(/\bsaint\b/g, "st")
    .replace(/[^a-z\s]/g, "")
    .replace(/\s+county\s*$/, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Last 5-digit group in a formatted address, e.g. "…, Orange Park, FL 32073". */
export function zipFromAddress(address: string | null | undefined): string | null {
  if (!address) return null;
  const matches = address.match(/\b\d{5}\b/g);
  return matches ? matches[matches.length - 1] : null;
}

export type ServiceAreaResult = {
  inServiceArea: boolean;
  zip: string | null;
  county: string | null;
  /** Which signal decided it. "unresolved" means no zip and no county: treated as out of area. */
  basis: "county" | "zip" | "unresolved";
};

/**
 * County first when Rentcast resolved one, ZIP second, then false.
 * An address we cannot place is not counted - an unverified lead should never
 * teach Meta anything.
 */
export function resolveServiceArea(input: {
  county?: string | null;
  state?: string | null;
  zipCode?: string | null;
  address?: string | null;
}): ServiceAreaResult {
  const zip = input.zipCode || zipFromAddress(input.address);
  const county = input.county ? normalizeCounty(input.county) : null;

  // A "Clay" or "Duval" county exists in other states, so only trust the county
  // name when something says Florida.
  const looksFlorida =
    (input.state ?? "").toUpperCase() === "FL" ||
    /\bFL\b|\bFlorida\b/i.test(input.address ?? "") ||
    (zip !== null && SERVICE_AREA_ZIPS.has(zip));

  if (county && looksFlorida) {
    return {
      inServiceArea: SERVICE_AREA_COUNTIES.includes(county),
      zip,
      county,
      basis: "county",
    };
  }

  if (zip) {
    return {
      inServiceArea: SERVICE_AREA_ZIPS.has(zip),
      zip,
      county,
      basis: "zip",
    };
  }

  return { inServiceArea: false, zip: null, county, basis: "unresolved" };
}
