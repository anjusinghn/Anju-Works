import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://i.scdn.co https://cdn.discordapp.com https://wsrv.nl",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  outputFileTracingIncludes: {
    "/**": ["./lib/fonts/**/*", "./content/writing/**/*"],
    "/opengraph-image": ["./public/images/og/garden.png"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { hostname: "i.scdn.co" },
      { hostname: "cdn.discordapp.com" },
      { hostname: "wsrv.nl" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons"],
  },
  async redirects() {
    return [
      { source: "/case-study/smart-resume-screener", destination: "/project/smart-resume-screener", permanent: true },
      { source: "/projects/:id", destination: "/project/:id", permanent: true },
      { source: "/sitemap-index.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/sitemap-0.xml", destination: "/sitemap.xml", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
