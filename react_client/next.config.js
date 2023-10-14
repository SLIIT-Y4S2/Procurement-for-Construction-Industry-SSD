/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  env: {
    RUNNING_ENVIRONMENT: process.env.RUNNING_ENVIRONMENT,
  },
};

module.exports = nextConfig;
