import { put } from "@vercel/blob";

// Download from Unsplash and upload to Blob in one step
const urls = [
  "https://images.unsplash.com/photo-1700852525786-3df22b0790e4?w=1200&q=80&fit=crop",
  "https://unsplash.com/photos/FXz7_jN3Pzs/download?w=1200",
  "https://images.unsplash.com/photo-1564501911498-45ea65456bbb?w=1200&q=80&fit=crop",
];

let buffer = null;
for (const url of urls) {
  console.log(`Trying: ${url}`);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" },
      redirect: "follow",
    });
    if (!res.ok) {
      console.log(`  HTTP ${res.status}`);
      continue;
    }
    const ct = res.headers.get("content-type") || "";
    const buf = Buffer.from(await res.arrayBuffer());
    console.log(`  Got ${buf.length} bytes, type: ${ct}`);
    if (buf.length > 10000 && !ct.includes("text/html")) {
      buffer = buf;
      console.log(`  SUCCESS`);
      break;
    }
    console.log(`  Skipped (too small or HTML)`);
  } catch (e) {
    console.log(`  Error: ${e.message}`);
  }
}

if (!buffer) {
  console.error("Failed to download from any source");
  process.exit(1);
}

console.log(`\nUploading ${buffer.length} bytes to Blob storage...`);

const blob = await put("jaxpm/images/pain-points.jpg", buffer, {
  access: "public",
  contentType: "image/jpeg",
  addRandomSuffix: false,
  allowOverwrite: true,
});

console.log(`Uploaded: ${blob.url}`);
