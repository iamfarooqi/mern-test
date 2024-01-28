/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                // destination: "http://localhost:5000/:path*",
                  destination: "https://mern-test-server.vercel.app/:path*",
            },
        ];
    },
};

export default nextConfig;
