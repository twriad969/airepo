import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/sonner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://prompthancer.com'),
  title: 'Prompthancer - Free AI-Powered Prompt Enhancement Tool',
  description: 'Transform your prompts instantly with Prompthancer - the free AI-powered enhancement tool. No sign-up required. Improve your AI interactions effortlessly with our bold approach to prompt optimization.',
  keywords: [
    'AI prompt enhancer', 'free AI writing assistant', 'no signup required', 'prompt optimization tool',
    'ChatGPT prompt enhancer', 'AI prompt engineering', 'AI prompt creator', 'AI writing tool', 
    'natural language processing', 'machine learning prompts', 'AI conversation optimizer', 
    'free prompt enhancement', 'AI-powered writing improvement', 'AI prompt refinement', 
    'intelligent text suggestions', 'AI language model assistant', 'prompt crafting tool', 
    'AI prompt effectiveness', 'AI writing productivity', 'instant AI tool', 
    'prompt enhancer', 'ai prompt enhancer', 'flux prompt enhancer', 'ai image prompt enhancer', 
    'prompt enhancer for ChatGPT', 'midjourney prompt enhancer', 'nsfw prompt enhancer', 
    'image prompt enhancer', 'prompt enhancer AI', 'stable diffusion prompt enhancer', 
    'prompt enhancer free', 'prompt enhancer stable diffusion', 'GPT prompt enhancer', 
    'AI prompt enhancer free', 'prompt enhancer for stable diffusion', 'ChatGPT prompt enhancer', 
    'free prompt enhancer', 'AI art prompt enhancer', 'prompt enhancer online', 'glif prompt enhancer'
  ],
  authors: [{ name: 'Prompthancer Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://prompthancer.com',
    title: 'Prompthancer - Free AI-Powered Prompt Enhancement',
    description: 'Transform your prompts instantly with Prompthancer - the free AI-powered enhancement tool. No sign-up required. Improve your AI interactions effortlessly with our bold approach.',
    siteName: 'Prompthancer',
    images: [
      {
        url: 'https://i.ibb.co.com/gRFbm7s/bold-2.png',
        width: 1200,
        height: 630,
        alt: 'Prompthancer - Bold AI-Powered Prompt Enhancement',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prompthancer - Free AI-Powered Prompt Enhancement',
    description: 'Transform your prompts instantly with Prompthancer - the free AI-powered enhancement tool. No sign-up required. Improve your AI interactions effortlessly with our bold approach.',
    images: ['https://i.ibb.co.com/gRFbm7s/bold-2.png'],
    creator: '@prompthancer',
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="canonical" href="https://prompthancer.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:image" content="https://i.ibb.co.com/gRFbm7s/bold-2.png" />
        <meta property="og:image:alt" content="Prompthancer - Bold AI-Powered Prompt Enhancement" />
        <meta name="twitter:image" content="https://i.ibb.co.com/gRFbm7s/bold-2.png" />
        <meta name="twitter:image:alt" content="Prompthancer - Bold AI-Powered Prompt Enhancement" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
