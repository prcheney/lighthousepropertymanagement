/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  outputFileTracingIncludes: {
    "/api/submit-form": ["./node_modules/@sparticuz/chromium/bin/**"],
  },
}

export default nextConfig
