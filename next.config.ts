import type { NextConfig } from "next";

const config: NextConfig = {
  poweredByHeader: false,
  outputFileTracingExcludes: { "/**": ["./supabase/**"] },
};

export default config;
