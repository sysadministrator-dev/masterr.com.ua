import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Shared hosting reports the host machine's full CPU count, not the account's
  // actual resource limit — a wide build worker pool gets OOM-killed there.
  experimental: {
    cpus: 1,
  },
};

export default nextConfig;
