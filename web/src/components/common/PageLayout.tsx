import type { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

interface PageLayoutProps {
  children: ReactNode
  hideFooter?: boolean
  className?: string
}

export function PageLayout({ children, hideFooter = false, className }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className={`flex-1 ${className ?? ''}`}>{children}</main>
      {!hideFooter && <Footer />}
    </div>
  )
}
