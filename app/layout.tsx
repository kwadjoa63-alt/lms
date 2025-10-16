import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ToastProvider } from '@/components/providers/toaster-provider'
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from '@/components/providers/theme-provider'
import { ConfettiProvider } from '@/components/providers/confetti-provider'
import { SessionProvider } from '@/components/providers/session-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kwadjo Learning Platform',
  description: 'Empowering education through technology - Learn, Grow, Succeed with Kwadjo'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <ThemeContextProvider>
            <ConfettiProvider />
            <ToastProvider />
            {children}
            <ThemeSwitch />
          </ThemeContextProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
