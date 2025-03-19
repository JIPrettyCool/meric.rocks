import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Meric | Software Developer',
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
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-foreground/5 bg-background/70 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <a href="#" className="font-bold text-xl">merickmrc.com</a>
            <nav>
              <ul className="flex gap-x-8">
                <li>
                  <a href="#projects" className="relative text-sm text-foreground/70 hover:text-foreground transition-colors duration-200 group">
                    Projects
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-200 group-hover:w-full"></span>
                  </a>
                </li>
                <li>
                  <a href="#about" className="relative text-sm text-foreground/70 hover:text-foreground transition-colors duration-200 group">
                    About
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-200 group-hover:w-full"></span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        {children}
        <footer className="bg-secondary/80 py-12 px-6 border-t border-foreground/5">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8 flex justify-center gap-6">
              <a href="https://github.com/jiprettycool" target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-foreground transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="https://twitter.com/iamrealji" target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-foreground transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
            <p className="text-foreground/40 text-sm">© {new Date().getFullYear()} Meric. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}