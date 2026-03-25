export interface ReportData {
  name: string;
  address: string;
  generatedDate: string;
  logoBase64: string;
  streetViewBase64: string;
  mapBase64: string;
  propertyData: {
    formattedAddress?: string;
    bedrooms?: number;
    bathrooms?: number;
    squareFootage?: number;
    yearBuilt?: number;
    propertyType?: string;
    county?: string;
    zipCode?: string;
  } | null;
  rentData: {
    rent?: number;
    rentRangeLow?: number;
    rentRangeHigh?: number;
    fromComparables?: boolean;
  } | null;
  comparables: Array<{
    formattedAddress: string;
    bedrooms?: number;
    bathrooms?: number;
    squareFootage?: number;
    price: number;
    daysOnMarket?: number;
  }>;
  marketData: {
    medianRent?: number;
    averageDaysOnMarket?: number;
    totalListings?: number;
    medianRentPerSquareFoot?: number;
  } | null;
}

function fmt(n: number) {
  return new Intl.NumberFormat("en-US").format(Math.round(n));
}

function fmtBaths(n: number) {
  return n % 1 === 0 ? n.toString() : n.toFixed(1);
}

export function buildReportHTML(d: ReportData): string {
  const prop = d.propertyData;
  const rent = d.rentData;
  const market = d.marketData;
  const comps = d.comparables.slice(0, 5);
  const displayAddress = prop?.formattedAddress ?? d.address;

  const detailItems = [
    prop?.bedrooms != null ? { value: String(prop.bedrooms), label: "Beds" } : null,
    prop?.bathrooms != null ? { value: fmtBaths(prop.bathrooms), label: "Baths" } : null,
    prop?.squareFootage != null ? { value: fmt(prop.squareFootage), label: "Sq Ft" } : null,
    prop?.yearBuilt != null ? { value: String(prop.yearBuilt), label: "Built" } : null,
    prop?.propertyType != null ? { value: prop.propertyType.replace("Single Family", "SFR"), label: "Type" } : null,
    prop?.county != null ? { value: prop.county, label: "County" } : null,
  ].filter(Boolean) as { value: string; label: string }[];

  const marketStats = [
    market?.medianRent != null ? { value: `$${fmt(market.medianRent)}`, label: "Median Rent" } : null,
    market?.totalListings != null ? { value: String(market.totalListings), label: "Active Listings" } : null,
    market?.averageDaysOnMarket != null ? { value: `${Math.round(market.averageDaysOnMarket)}d`, label: "Avg Days on Mkt" } : null,
    market?.medianRentPerSquareFoot != null ? { value: `$${market.medianRentPerSquareFoot.toFixed(2)}`, label: "Median $/Sq Ft" } : null,
  ].filter(Boolean) as { value: string; label: string }[];

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body {
    width: 816px;
    height: 1056px;
    overflow: hidden;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  body {
    font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
    font-size: 8px;
    color: #1A1A1A;
    background: #F9F7F4;
    display: flex;
    flex-direction: column;
  }

  /* ── Header ─────────────────────────────── */
  .header {
    background: #0D1F2D;
    padding: 12px 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
  }
  .header img { height: 34px; object-fit: contain; filter: brightness(0) invert(1); }
  .header-right { text-align: right; }
  .header-title {
    color: #fff;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
  .header-date { color: #C9A84C; font-size: 7px; margin-top: 3px; }

  /* ── Subheader ───────────────────────────── */
  .subheader {
    background: #fff;
    padding: 8px 28px;
    border-bottom: 1px solid #D9D6D0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
  }
  .prepared-label { font-size: 6.5px; color: #5A6672; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 1px; }
  .prepared-name { font-size: 13px; font-weight: 700; font-family: 'Playfair Display', serif; color: #0D1F2D; }
  .prepared-address { font-size: 8px; color: #5A6672; margin-top: 1px; }
  .confidential-badge {
    background: #0D1F2D; color: #C9A84C;
    font-size: 6.5px; font-weight: 700; letter-spacing: 1px;
    text-transform: uppercase; padding: 3px 8px; border-radius: 3px;
  }

  /* ── Street view ─────────────────────────── */
  .street-view-wrap {
    position: relative;
    height: 155px;
    overflow: hidden;
    flex-shrink: 0;
  }
  .street-view-wrap img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
  }
  .street-view-overlay {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: linear-gradient(to top, rgba(13,31,45,0.80) 0%, rgba(13,31,45,0.40) 50%, rgba(13,31,45,0) 100%);
    padding: 10px 28px 8px;
  }
  .sv-label { color: rgba(255,255,255,0.55); font-size: 6.5px; letter-spacing: 0.8px; text-transform: uppercase; }
  .sv-address { color: #fff; font-size: 11px; font-weight: 600; margin-top: 1px; }

  /* ── Main body ───────────────────────────── */
  .body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 14px 28px 10px;
    min-height: 0;
  }
  .body-content {
    display: flex;
    flex-direction: column;
  }

  .section-label {
    font-size: 6.5px; font-weight: 700; color: #C9A84C;
    letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px;
  }

  /* ── Details bar ─────────────────────────── */
  .details-bar {
    background: #fff;
    border: 1px solid #D9D6D0;
    border-radius: 5px;
    display: flex;
    margin-bottom: 12px;
    flex-shrink: 0;
  }
  .detail-item {
    flex: 1; text-align: center;
    padding: 8px 6px;
  }
  .detail-item + .detail-item { border-left: 1px solid #D9D6D0; }
  .detail-value { font-size: 15px; font-weight: 700; color: #0D1F2D; line-height: 1; }
  .detail-label { font-size: 6px; color: #5A6672; letter-spacing: 0.5px; text-transform: uppercase; margin-top: 3px; }

  /* ── Columns ─────────────────────────────── */
  .columns {
    display: flex;
    gap: 14px;
    min-height: 0;
  }
  .col-left { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 12px; }
  .col-right { width: 210px; flex-shrink: 0; display: flex; flex-direction: column; gap: 12px; }

  /* ── Rent hero ───────────────────────────── */
  .rent-hero {
    background: #0D1F2D;
    border-radius: 6px;
    padding: 16px 20px;
    text-align: center;
    flex-shrink: 0;
  }
  .rent-eyebrow { font-size: 6.5px; color: #C9A84C; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; margin-bottom: 6px; }
  .rent-amount { font-size: 42px; font-weight: 700; color: #fff; line-height: 1; letter-spacing: -1px; font-family: 'Playfair Display', serif; }
  .rent-per { font-size: 9px; color: rgba(255,255,255,0.4); margin-top: 3px; }
  .rent-range-wrap { margin-top: 8px; display: flex; justify-content: center; }
  .rent-range-pill {
    display: inline-flex; align-items: center; gap: 5px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 20px; padding: 4px 12px;
  }
  .rrl { font-size: 6px; color: rgba(255,255,255,0.3); letter-spacing: 0.5px; text-transform: uppercase; }
  .rrv { font-size: 9px; font-weight: 700; color: #fff; }
  .rrd { font-size: 9px; color: rgba(255,255,255,0.2); }
  .rent-note { font-size: 6px; color: rgba(255,255,255,0.22); margin-top: 6px; }

  /* ── Comparables table ───────────────────── */
  .table-section { display: flex; flex-direction: column; min-height: 0; }
  .table-wrap { border-radius: 5px; overflow: hidden; border: 1px solid #D9D6D0; }
  table { width: 100%; border-collapse: collapse; }
  thead tr { background: #0D1F2D; }
  thead th {
    padding: 6px 8px; font-size: 6.5px; font-weight: 700;
    color: #fff; letter-spacing: 0.8px; text-transform: uppercase; text-align: left;
  }
  tbody tr:nth-child(even) { background: #F9F7F4; }
  tbody tr:nth-child(odd) { background: #fff; }
  tbody td {
    padding: 6px 8px; font-size: 7.5px;
    color: #1A1A1A; border-bottom: 1px solid #D9D6D0;
    vertical-align: top;
  }
  tbody tr:last-child td { border-bottom: none; }
  .td-street { font-weight: 600; }
  .td-sub { font-size: 6px; color: #5A6672; margin-top: 1px; }
  .td-center { text-align: center; }
  .td-right { text-align: right; }
  .td-rent { font-weight: 700; text-align: right; color: #0D1F2D; }

  /* ── Map ─────────────────────────────────── */
  .map-wrap {
    border-radius: 5px; overflow: hidden;
    border: 1px solid #D9D6D0; flex-shrink: 0;
  }
  .map-wrap img { width: 100%; display: block; }
  .map-legend {
    display: flex; gap: 10px; margin-top: 5px;
    padding: 0 2px;
  }
  .legend-item { display: flex; align-items: center; gap: 4px; font-size: 6.5px; color: #5A6672; }
  .legend-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
  .dot-subject { background: #C9A84C; }
  .dot-comp { background: #0D1F2D; }

  /* ── Market stats ────────────────────────── */
  .market-card {
    background: #fff; border-radius: 5px;
    border: 1px solid #D9D6D0; padding: 10px;
  }
  .market-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
  .market-stat {
    background: #F9F7F4; border-radius: 4px;
    padding: 7px 8px; border-left: 2px solid #C9A84C;
  }
  .ms-value { font-size: 13px; font-weight: 700; color: #0D1F2D; line-height: 1; }
  .ms-label { font-size: 6px; color: #5A6672; margin-top: 2px; }

  /* ── CTA card ───────────────────────────── */
  .cta-card {
    background: #fff;
    border: 1px solid #D9D6D0;
    border-radius: 5px;
    padding: 12px;
  }
  .cta-title {
    font-size: 9px; font-weight: 700; color: #0D1F2D; margin-bottom: 6px;
  }
  .cta-step {
    display: flex; gap: 8px; align-items: flex-start;
    margin-bottom: 6px;
  }
  .cta-step:last-child { margin-bottom: 0; }
  .cta-num {
    width: 16px; height: 16px; border-radius: 50%;
    background: #0D1F2D; color: #C9A84C;
    font-size: 7px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .cta-text { font-size: 7px; color: #5A6672; line-height: 1.5; }
  .cta-text strong { color: #0D1F2D; }
  .cta-phone {
    display: block;
    margin-top: 8px; padding: 6px 0;
    text-align: center;
    background: #C9A84C; color: #0D1F2D;
    font-size: 8px; font-weight: 700;
    border-radius: 4px; letter-spacing: 0.5px;
  }

  /* ── Disclaimer ──────────────────────────── */
  .disclaimer {
    padding-top: 8px;
    border-top: 1px solid #D9D6D0;
    font-size: 5.5px;
    color: #5A6672;
    line-height: 1.5;
    flex-shrink: 0;
    margin-top: 10px;
  }

  /* ── Footer ──────────────────────────────── */
  .footer {
    background: #0D1F2D;
    padding: 9px 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
  }
  .footer-company { color: #fff; font-size: 7.5px; font-weight: 700; letter-spacing: 0.5px; }
  .footer-contact { color: rgba(255,255,255,0.35); font-size: 6.5px; margin-top: 1px; }
  .footer-right { color: #C9A84C; font-size: 6.5px; letter-spacing: 0.3px; }
</style>
</head>
<body>

<div class="header">
  <img src="data:image/png;base64,${d.logoBase64}" alt="Lighthouse Property Management">
  <div class="header-right">
    <div class="header-title">Rental Analysis Report</div>
    <div class="header-date">Generated ${d.generatedDate}</div>
  </div>
</div>

<div class="subheader">
  <div>
    <div class="prepared-label">Prepared exclusively for</div>
    <div class="prepared-name">${d.name}</div>
    <div class="prepared-address">${displayAddress}</div>
  </div>
  <div class="confidential-badge">Confidential</div>
</div>

<div class="street-view-wrap">
  <img src="data:image/jpeg;base64,${d.streetViewBase64}" alt="Street view">
  <div class="street-view-overlay">
    <div class="sv-label">Subject Property</div>
    <div class="sv-address">${displayAddress}</div>
  </div>
</div>

<div class="body">
<div class="body-content">

  <div class="section-label">Property Details</div>
  <div class="details-bar">
    ${detailItems.map(item => `
    <div class="detail-item">
      <div class="detail-value">${item.value}</div>
      <div class="detail-label">${item.label}</div>
    </div>`).join("")}
  </div>

  <div class="columns">

    <div class="col-left">

      ${rent?.rent ? `
      <div class="rent-hero">
        <div class="rent-eyebrow">Estimated Monthly Rental Value</div>
        <div class="rent-amount">$${fmt(rent.rent)}</div>
        <div class="rent-per">per month</div>
        ${rent.rentRangeLow && rent.rentRangeHigh ? `
        <div class="rent-range-wrap">
          <div class="rent-range-pill">
            <span class="rrl">Range</span>
            <span class="rrv">$${fmt(rent.rentRangeLow)}</span>
            <span class="rrd">–</span>
            <span class="rrv">$${fmt(rent.rentRangeHigh)}</span>
            <span class="rrl">/ mo</span>
          </div>
        </div>` : ""}
        <div class="rent-note">${rent.fromComparables
          ? "Derived from median of active comparable listings in your zip code."
          : "Based on automated valuation of comparable rental properties."}</div>
      </div>` : ""}

      ${comps.length > 0 ? `
      <div class="table-section">
        <div class="section-label">Comparable Rentals Nearby</div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Address</th>
                <th class="td-center">Bed</th>
                <th class="td-center">Bath</th>
                <th class="td-center">Sq Ft</th>
                <th class="td-right">Rent / Mo</th>
              </tr>
            </thead>
            <tbody>
              ${comps.map(c => `
              <tr>
                <td>
                  <div class="td-street">${c.formattedAddress.split(",")[0]}</div>
                  ${c.daysOnMarket != null ? `<div class="td-sub">${c.daysOnMarket}d on market</div>` : ""}
                </td>
                <td class="td-center">${c.bedrooms ?? "—"}</td>
                <td class="td-center">${c.bathrooms != null ? fmtBaths(c.bathrooms) : "—"}</td>
                <td class="td-center">${c.squareFootage != null ? fmt(c.squareFootage) : "—"}</td>
                <td class="td-rent">$${fmt(c.price)}</td>
              </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>` : ""}

    </div><!-- /col-left -->

    <div class="col-right">

      ${d.mapBase64 ? `
      <div>
        <div class="section-label">Comparable Locations</div>
        <div class="map-wrap">
          <img src="data:image/png;base64,${d.mapBase64}" alt="Map">
        </div>
        <div class="map-legend">
          <div class="legend-item"><div class="legend-dot dot-subject"></div>Subject property</div>
          <div class="legend-item"><div class="legend-dot dot-comp"></div>Comparables</div>
        </div>
      </div>` : ""}

      ${marketStats.length > 0 ? `
      <div>
        <div class="section-label">Market Overview · ${prop?.zipCode ?? ""}</div>
        <div class="market-card">
          <div class="market-grid">
            ${marketStats.map(s => `
            <div class="market-stat">
              <div class="ms-value">${s.value}</div>
              <div class="ms-label">${s.label}</div>
            </div>`).join("")}
          </div>
        </div>
      </div>` : ""}

      <div>
        <div class="section-label">Next Steps</div>
        <div class="cta-card">
          <div class="cta-title">Maximize Your Rental Income</div>
          <div class="cta-step">
            <div class="cta-num">1</div>
            <div class="cta-text"><strong>Review your report</strong> — compare your property to active listings in your area.</div>
          </div>
          <div class="cta-step">
            <div class="cta-num">2</div>
            <div class="cta-text"><strong>Schedule a consultation</strong> — we'll walk through your property's potential and answer any questions.</div>
          </div>
          <div class="cta-step">
            <div class="cta-num">3</div>
            <div class="cta-text"><strong>Get listed</strong> — our team handles marketing, tenant screening, and ongoing management.</div>
          </div>
          <div class="cta-phone">(904) 822-7661</div>
        </div>
      </div>

    </div><!-- /col-right -->

  </div><!-- /columns -->
</div><!-- /body-content -->

  <div class="disclaimer">
    This report was prepared by Lighthouse Property Management & Realty, LLC exclusively for ${d.name} and is based on publicly available rental market data as of ${d.generatedDate}. Rental estimates are derived from comparable active listings and/or automated valuation models and should not be construed as a guarantee of rental income. Actual rental rates may vary based on property condition, market timing, and negotiation. Map imagery © Google. Lighthouse Property Management & Realty, LLC is a licensed property management company in the State of Florida.
  </div>

</div><!-- /body -->

<div class="footer">
  <div>
    <div class="footer-company">Lighthouse Property Management & Realty, LLC</div>
    <div class="footer-contact">customerservice@jaxpm.com &nbsp;·&nbsp; (904) 822-7661 &nbsp;·&nbsp; 3018 Alvarado Ave., Jacksonville, FL 32217</div>
  </div>
  <div class="footer-right">Confidential &nbsp;·&nbsp; ${d.generatedDate}</div>
</div>

</body>
</html>`;
}
