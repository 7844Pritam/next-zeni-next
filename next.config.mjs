/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "placehold.co",
      "plus.unsplash.com",
      "encrypted-tbn0.gstatic.com",
      "lowqualitymemes.com",
      "images.unsplash.com"
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/**",
      },
    ],
  },
};

export default nextConfig;
