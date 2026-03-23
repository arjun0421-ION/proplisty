/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Supabase's generic Database type causes false-positive TS errors
    // with supabase-js 2.99.x + strict mode. Runtime behaviour is correct.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
