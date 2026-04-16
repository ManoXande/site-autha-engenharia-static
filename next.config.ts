import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (40% smaller than WebP), WebP fallback
    formats: ["image/avif", "image/webp"],
    // 1-year cache for immutable assets
    minimumCacheTTL: 31536000,
    // Srcset breakpoints for viewport-aware delivery
    deviceSizes: [375, 640, 768, 1280, 1920, 2560],
    imageSizes: [16, 32, 64, 128, 256],
    qualities: [75, 85],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
