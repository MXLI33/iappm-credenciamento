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
  sm: { box: 'h-8 w-8 rounded-lg text-xs', label: 'text-base' },
  md: { box: 'h-9 w-9 rounded-xl text-sm', label: 'text-lg' },
  lg: { box: 'h-12 w-12 rounded-2xl text-base', label: 'text-2xl' },
}

export function Logo({ size = 'md', variant = 'default', showText = true, className, asLink = true }: LogoProps) {
  const s = sizes[size]
  const isWhite = variant === 'white'

  const inner = (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div className={cn(
        'flex items-center justify-center shrink-0 font-extrabold tracking-tighter',
        s.box,
        isWhite ? 'bg-white text-primary-700' : 'bg-primary-700 text-white'
      )}>
        IA
      </div>
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
