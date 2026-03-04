import https from 'https';

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const doFetch = (u) => {
      https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          doFetch(res.headers.location);
          return;
        }
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      }).on('error', reject);
    };
    doFetch(url);
  });
}

async function main() {
  const html = await fetchPage('https://jaxpm.conversionpartners.net/');

  // Find all image-related URLs in the HTML
  const patterns = [
    /src=["']([^"']+\.(jpg|jpeg|png|webp|svg|gif)[^"']*)/gi,
    /srcSet=["']([^"']+)/gi,
    /url\(["']?([^"')]+\.(jpg|jpeg|png|webp|svg|gif)[^"')]*)/gi,
    /data-src=["']([^"']+)/gi,
    /background-image:\s*url\(["']?([^"')]+)/gi,
  ];

  const allUrls = new Set();

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      allUrls.add(match[1]);
    }
  }

  // Also look for any _next/image or _next/static references
  const nextPatterns = [
    /\/_next\/[^"'\s)]+\.(jpg|jpeg|png|webp|svg|gif)[^"'\s)]*/gi,
    /\/_next\/image[^"'\s)]*/gi,
  ];

  for (const pattern of nextPatterns) {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      allUrls.add(match[0]);
    }
  }

  // Also find blob URLs
  const blobPattern = /https:\/\/[^"'\s)]*blob[^"'\s)]*/gi;
  let match;
  while ((match = blobPattern.exec(html)) !== null) {
    allUrls.add(match[0]);
  }

  // Also find any other https image URLs
  const httpsImgPattern = /https:\/\/[^"'\s)]+\.(jpg|jpeg|png|webp|svg|gif)/gi;
  while ((match = httpsImgPattern.exec(html)) !== null) {
    allUrls.add(match[0]);
  }

  console.log("=== ALL IMAGE URLS FOUND ===\n");
  const sorted = [...allUrls].sort();
  sorted.forEach(url => console.log(url));
  console.log(`\nTotal: ${sorted.length} unique URLs`);

  // Also print a section of the raw HTML around "img" tags for context
  console.log("\n=== RAW IMG TAGS ===\n");
  const imgTagPattern = /<img[^>]+>/gi;
  while ((match = imgTagPattern.exec(html)) !== null) {
    console.log(match[0].substring(0, 500));
    console.log("---");
  }

  // Check for Next.js Image components (rendered as img with specific attributes)
  console.log("\n=== SEARCHING FOR IMAGE PATTERNS IN FIRST 5000 CHARS ===\n");
  console.log(html.substring(0, 5000));
}

main().catch(console.error);
