import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'white'
  showText?: boolean
  className?: string
  asLink?: boolean
}

const sizes = {
  sm: { img: 'h-8 w-8', label: 'text-base' },
  md: { img: 'h-9 w-9', label: 'text-lg' },
  lg: { img: 'h-12 w-12', label: 'text-2xl' },
}

export function Logo({ size = 'md', variant = 'default', showText = true, className, asLink = true }: LogoProps) {
  const s = sizes[size]
  const isWhite = variant === 'white'

  const inner = (
    <div className={cn('flex items-center gap-2.5', className)}>
      <img
        src="/logo.png"
        alt="IAPPM"
        className={cn('shrink-0 object-contain', s.img)}
      />
      {showText && (
        <span className={cn(
          'font-bold tracking-tight leading-none',
          s.label,
          isWhite ? 'text-white' : 'text-primary-800'
        )}>
          IAPPM
        </span>
      )}
    </div>
  )

  if (!asLink) return inner

  return (
    <Link to="/" className="flex items-center">
      {inner}
    </Link>
  )
}
