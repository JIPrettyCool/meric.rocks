import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Meriç',
  description: 'Personal website showcasing projects and skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <footer className="bg-background py-12 px-6 border-t border-foreground/5">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-foreground/40 text-sm">© {new Date().getFullYear()} Meriç.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
