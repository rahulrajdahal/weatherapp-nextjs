import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'WeatherApp',
    short_name: 'weatherApp',
    description: 'Visualize your weather forcast.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/images/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/images/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: '/images/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/images/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
