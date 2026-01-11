/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Vercel optimizations
  // Note: Remove 'standalone' output for Vercel (only needed for Docker)
  // output: 'standalone', // Commented out for Vercel
}

export default nextConfig
