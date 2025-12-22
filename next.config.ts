import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 성능 최적화 설정
  compress: true,
  poweredByHeader: false,
  
  // 이미지 최적화
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // 실험적 기능으로 성능 개선
  experimental: {
    optimizeCss: true,
  },
  
  // 헤더 최적화
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },
};

export default nextConfig;
