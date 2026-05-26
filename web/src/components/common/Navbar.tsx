import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Logo } from './Logo'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Início', href: '/' },
  { label: 'Psicólogos', href: '/psicologos' },
  { label: 'Como funciona', href: '/como-funciona' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="page-container flex h-16 items-center justify-between gap-4">

        {/* Logo */}
        <Logo size="md" />

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                isActive(link.href)
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900" asChild>
            <Link to="/entrar">Entrar</Link>
          </Button>
          <Button size="sm" className="bg-primary-700 hover:bg-primary-800 text-white px-5" asChild>
            <Link to="/credenciar">Credenciar-se</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-0">
            <div className="flex flex-col h-full">
              <div className="flex items-center h-16 px-5 border-b border-gray-100">
                <Logo size="md" asLink={false} />
              </div>

              <nav className="flex flex-col gap-1 p-4 flex-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                      isActive(link.href)
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="p-4 border-t border-gray-100 flex flex-col gap-2">
                <Button variant="outline" className="w-full" asChild onClick={() => setOpen(false)}>
                  <Link to="/entrar">Entrar</Link>
                </Button>
                <Button className="w-full bg-primary-700 hover:bg-primary-800" asChild onClick={() => setOpen(false)}>
                  <Link to="/credenciar">Credenciar-se</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

      </div>
    </header>
  )
}
