import type { Metadata } from 'next'
import { assetPath } from '@/lib/assetPath'
import { cardDescription, siteConfig, siteUrl, twitterSite } from '@/lib/site.config'

const defaultTitle = `${siteConfig.name} | ${siteConfig.tagline}`

/**
 * The social card, rendered from siteConfig by `pnpm run og:card` (ported
 * from FFC-IN-Footer_Only_Template). Regenerate it after changing name,
 * tagline, shortDescription, themeColor or ein. It replaces the 512x512 app
 * icon, which is Free For Charity's mark, not this organization's.
 */
const socialCard = {
  url: assetPath('/og-card.png'),
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — ${siteConfig.tagline}`,
}

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: siteUrl('/'),
  },
  openGraph: {
    type: 'website',
    url: siteUrl('/'),
    siteName: siteConfig.name,
    title: defaultTitle,
    description: cardDescription(),
    images: [socialCard],
  },
  twitter: {
    card: 'summary_large_image',
    site: twitterSite(),
    title: defaultTitle,
    description: cardDescription(),
    images: [socialCard.url],
  },
  icons: {
    icon: [
      { url: assetPath('/favicon.ico'), sizes: '32x32' },
      { url: assetPath('/icon.png'), type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: assetPath('/apple-icon.png'), sizes: '180x180', type: 'image/png' }],
  },
  manifest: assetPath('/manifest.webmanifest'),
}
