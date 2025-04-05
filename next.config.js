/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  buildExcludes: [/chunks[\\/]pages[\\/]_app/],
});
const nextConfig = withPWA({
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     // Exclude Node.js modules from the client-side bundle
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       child_process: false,
  //       fs: false,
  //       net: false,
  //       tls: false,
  //     };
  //   }

  //   // Remove "node:" protocol from aliases
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     child_process: "child_process",
  //     fs: "fs",
  //     net: "net",
  //     tls: "tls",
  //   };

  //   return config;
  // },
});

module.exports = nextConfig;
