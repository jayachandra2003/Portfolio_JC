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
  // The site moved from separate pages to one scrolling home page with
  // anchor sections. These redirects keep old bookmarks/links working
  // instead of 404ing. Note: "/projects" redirects, but "/projects/skywrite"
  // is unaffected since Next.js redirect `source` matches exact paths only,
  // not nested ones — the case study stays a real standalone page.
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/projects", destination: "/#projects", permanent: true },
      { source: "/certifications", destination: "/#certifications", permanent: true },
      { source: "/resume", destination: "/#resume", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
