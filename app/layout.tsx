import { StyledComponentsRegistry } from '@/components';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'Find the weathaer forecast near you!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          {children}
          <Toaster />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
