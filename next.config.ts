/** @type {import('next').NextConfig} */

import { NextConfig } from "next";

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

const nextConfig = {};

module.exports = (phase: NextConfig) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = require('@ducanh2912/next-pwa').default({
      dest: 'public',
    });
    return withPWA(nextConfig);
  }
  return nextConfig;
};
