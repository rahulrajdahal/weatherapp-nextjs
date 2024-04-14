'use client';

export const myImageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality: number;
}) => {
  return `https://cdn.weatherapi.com/${src.replace('//cdn.weatherapi.com/', '')}?w=${width}&q=${quality || 75}`;
};
