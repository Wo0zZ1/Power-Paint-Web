import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactCompiler: true,
  typedRoutes: true,
  images: {
    remotePatterns: [new URL("https://avatars.githubusercontent.com")],
  },
};

const withNextIntl = createNextIntlPlugin({
  requestConfig: "./src/shared/i18n/request.ts",
});

export default withNextIntl(nextConfig);
