import type { NextConfig } from 'next';

const config: NextConfig = {
  // Libera Hot Reload para IPs locais (CORS dev)
  allowedDevOrigins: [process.env.DEV_HOST || 'localhost'],
};

export default config;