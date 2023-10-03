/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["gitee.com", "images.pexels.com", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
