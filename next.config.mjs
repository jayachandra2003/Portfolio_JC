/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // All images are served from /public — no remote Firebase Storage bucket,
  // so no remotePatterns/domains needed. Add entries here only if an
  // external image host is introduced later.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
