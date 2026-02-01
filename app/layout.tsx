import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ChatWidget';
import StructuredData from '@/components/seo/StructuredData';
import ScrollToTop from '@/components/ui/ScrollToTop';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import MetaPixel from '@/components/analytics/MetaPixel';

export const metadata: Metadata = {
  metadataBase: new URL('https://smileturkey.com'),
  title: {
    default: 'Smile Turkey | Premium Dental Tourism in Antalya - Save 70%',
    template: '%s | Smile Turkey'
  },
  description: 'World-class dental treatments in paradise. Dental veneers from $250, implants from $800. 10,000+ happy patients. Hotel + transfers included. Get your dream smile in Antalya, Turkey.',
  keywords: [
    'dental tourism turkey',
    'dental veneers turkey',
    'dental implants antalya',
    'hollywood smile turkey',
    'teeth whitening antalya',
    'all-on-4 turkey',
    'dental clinic antalya',
    'cosmetic dentistry turkey',
    'affordable dental care',
    'turkey dental packages'
  ],
  authors: [{ name: 'Smile Turkey' }],
  creator: 'Smile Turkey Dental Tourism',
  publisher: 'Smile Turkey',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://smileturkey.com',
    siteName: 'Smile Turkey',
    title: 'Smile Turkey - Premium Dental Tourism in Antalya',
    description: 'Save 70% on world-class dental treatments. Veneers from $250, implants from $800. All-inclusive packages with hotel & transfers.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Smile Turkey - Dental Tourism in Antalya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smile Turkey - Save 70% on Dental Treatments',
    description: 'Premium dental tourism in Antalya, Turkey. Veneers from $250, implants from $800. Hotel & transfers included.',
    images: ['/og-image.jpg'],
    creator: '@smileturkey',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://smileturkey.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Analytics */}
        <GoogleAnalytics />
        <MetaPixel />
      </head>
      <body className="relative min-h-screen bg-slate-950 text-white">
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
        <ScrollToTop />
        <StructuredData />
      </body>
    </html>
  );
}
