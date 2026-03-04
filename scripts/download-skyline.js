import fs from 'fs';

// Jacksonville skyline sunset by Lance Asper on Unsplash
// https://unsplash.com/photos/an-aerial-view-of-a-city-and-a-river-FXz7_jN3Pzs
const urls = [
  'https://images.unsplash.com/photo-1700852525786-3df22b0790e4?w=1200&q=80&fit=crop',
  'https://images.unsplash.com/photo-1564501911498-45ea65456bbb?w=1200&q=80&fit=crop',
  'https://images.unsplash.com/photo-1605117882932-f9e32b03fea9?w=1200&q=80&fit=crop',
];

async function download() {
  for (const url of urls) {
    console.log(`Trying: ${url}`);
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' },
        redirect: 'follow',
      });
      console.log(`Status: ${res.status}, Content-Type: ${res.headers.get('content-type')}`);
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        console.log(`Size: ${buffer.length} bytes`);
        if (buffer.length > 5000) {
          fs.writeFileSync('/tmp/jacksonville-skyline.jpg', buffer);
          console.log('Saved to /tmp/jacksonville-skyline.jpg');
          return;
        }
      }
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }

  // Try the Unsplash source URL format (no API key needed)
  const sourceUrls = [
    'https://source.unsplash.com/FXz7_jN3Pzs/1200x800',
    'https://source.unsplash.com/1200x800/?jacksonville,florida,skyline',
  ];

  for (const url of sourceUrls) {
    console.log(`Trying source: ${url}`);
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' },
        redirect: 'follow',
      });
      console.log(`Status: ${res.status}, Content-Type: ${res.headers.get('content-type')}, Final URL: ${res.url}`);
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        console.log(`Size: ${buffer.length} bytes`);
        if (buffer.length > 5000) {
          fs.writeFileSync('/tmp/jacksonville-skyline.jpg', buffer);
          console.log('Saved to /tmp/jacksonville-skyline.jpg');
          // Also print the final resolved URL for blobUrl use
          console.log(`RESOLVED_URL=${res.url}`);
          return;
        }
      }
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }

  console.log('All attempts failed');
}

download();
