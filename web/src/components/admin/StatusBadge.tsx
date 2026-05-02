import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const statusConfig = {
  pending: { label: 'Pendente', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  under_review: { label: 'Em análise', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  approved: { label: 'Aprovado', className: 'bg-green-100 text-green-800 border-green-200' },
  rejected: { label: 'Rejeitado', className: 'bg-red-100 text-red-800 border-red-200' },
}

export function StatusBadge({ status }: { status: keyof typeof statusConfig }) {
  const config = statusConfig[status] ?? statusConfig.pending
  return (
    <Badge variant="outline" className={cn('text-xs font-medium', config.className)}>
      {config.label}
    </Badge>
  )
}
