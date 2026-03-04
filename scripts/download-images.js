import fs from 'fs';
import path from 'path';

const imagesDir = '/tmp/jaxpm-images';

// Ensure images directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const BLOB_BASE = "https://r2hd6enfeuk3nxlh.public.blob.vercel-storage.com/jaxpm/images";
const LIVE_SITE = "https://jaxpm.conversionpartners.net";

// All images referenced in the codebase - try multiple sources for each
const imageNames = [
  'logo.png',
  'hero-bg.jpg',
  'service-residential.jpg',
  'service-vacation.jpg',
  'service-investor.jpg',
  'service-tenant.jpg',
  'service-maintenance.jpg',
  'service-financial.jpg',
  'why-us.jpg',
  'pain-points.jpg',
  'rental-analysis-report.jpg',
  'contact.jpg',
];

// For each image, try blob storage first, then live site
function getUrlsForImage(filename) {
  return [
    `${BLOB_BASE}/${filename}`,
    `${LIVE_SITE}/images/${filename}`,
  ];
}

async function tryDownload(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
      redirect: 'follow',
    });

    if (!response.ok) {
      return null;
    }

    const contentType = response.headers.get('content-type') || '';
    // Skip HTML responses (error pages)
    if (contentType.includes('text/html')) {
      return null;
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    // Skip tiny responses (likely error pages)
    if (buffer.length < 1000) {
      return null;
    }

    return { buffer, contentType, url };
  } catch (error) {
    return null;
  }
}

async function downloadImage(filename) {
  const filepath = path.join(imagesDir, filename);
  const urls = getUrlsForImage(filename);

  for (const url of urls) {
    const result = await tryDownload(url);
    if (result) {
      fs.writeFileSync(filepath, result.buffer);
      console.log(`OK: ${filename} (${result.buffer.length} bytes, ${result.contentType}) from ${result.url}`);
      return true;
    }
  }

  console.log(`FAILED: ${filename} - could not download from any source`);
  return false;
}

async function main() {
  console.log(`Downloading ${imageNames.length} images to ${imagesDir}\n`);

  let succeeded = 0;
  let failed = 0;

  for (const filename of imageNames) {
    const ok = await downloadImage(filename);
    if (ok) succeeded++;
    else failed++;
  }

  console.log(`\nDone: ${succeeded} succeeded, ${failed} failed`);

  // List all files in the images directory
  const files = fs.readdirSync(imagesDir);
  console.log(`\nFiles in ${imagesDir}:`);
  files.forEach(f => {
    const stats = fs.statSync(path.join(imagesDir, f));
    console.log(`  ${f} (${stats.size} bytes)`);
  });
}

main();
