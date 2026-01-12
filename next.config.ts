import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'static01.nyt.com',
                port: '',
                pathname: '/bestsellers/images/**/**',
                search: '',
            },
            {
                protocol: 'http',
                hostname: 'books.google.com',
                port: '',
                pathname: '/books/content/**',
            },
            {
                protocol: 'https',
                hostname: 'covers.openlibrary.org',
                pathname: '/b/id/**.jpg',
            },
        ],
    },
};

export default nextConfig;
