import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // 모든 호스트 허용 (개발용)
            },
        ],
    },
};

export default nextConfig;
