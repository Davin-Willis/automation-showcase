import type { NextConfig } from "next";

// Deployed to https://<user>.github.io/automation-showcase on GitHub
// Pages, so every route and asset needs that prefix in CI. Locally we
// stay at the root so `npm run dev` works at localhost:3000.
const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubActions ? "/automation-showcase" : "",
  assetPrefix: isGitHubActions ? "/automation-showcase" : "",
  images: {
    // GitHub Pages has no image-optimization server
    unoptimized: true,
  },
  env: {
    // With unoptimized images next/image does NOT prepend basePath,
    // so components prefix static asset paths with this themselves.
    NEXT_PUBLIC_BASE_PATH: isGitHubActions ? "/automation-showcase" : "",
  },
  trailingSlash: true,
};

export default nextConfig;
