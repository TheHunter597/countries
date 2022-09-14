/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  images: {
    domains: ["flagcdn.com", "upload.wikimedia.org"],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  reactStrictMode: true,
  swcMinify: true,
};
