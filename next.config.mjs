/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: false,
  },
  experimental: {
    // Include SQLite DB + migrations in the serverless function bundle (Vercel demo)
    outputFileTracingIncludes: {
      "/*": ["./prisma/**/*"],
    },
  },
};

export default nextConfig;
