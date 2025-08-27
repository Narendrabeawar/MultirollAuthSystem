import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ConditionalNavbar from '@/components/layout/conditional-navbar'
import { Catamaran } from 'next/font/google'

const catamaran = Catamaran({ subsets: ['latin'], variable: '--font-catamaran' })

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'MultiUser SaaS - Role-Based Authentication Template',
  description: 'A production-ready multi-role authentication template built with Next.js 15, Supabase, and shadcn/ui',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${catamaran.variable} font-sans`}>
        <div className="min-h-screen bg-background">
          <ConditionalNavbar />
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
