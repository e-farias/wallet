/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  // Transpile monorepo packages
  transpilePackages: ['@repo/lib'],
  devIndicators: false,
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  allowedDevOrigins: ['localhost:3000', '*.localhost:3000'],
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", '*.localhost:3000'],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
};
