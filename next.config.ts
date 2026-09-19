import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const pagesBasePath =
  process.env.PAGES_BASE_PATH ||
  (isGithubPages ? "/tax-consulting" : "");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  trailingSlash: true,
  ...(isGithubPages
    ? {
        output: "export" as const,
        images: { unoptimized: true },
        ...(pagesBasePath ? { basePath: pagesBasePath } : {}),
      }
    : {
        async headers() {
          return [
            {
              source: "/(.*)",
              headers: securityHeaders,
            },
          ];
        },
      }),
};

export default nextConfig;
