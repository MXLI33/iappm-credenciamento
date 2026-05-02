import { SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { PsychologistCard } from './PsychologistCard'
import type { Psychologist } from '@/types'

interface PsychologistGridProps {
  psychologists: Psychologist[]
  loading: boolean
  total: number
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
  onClearFilters: () => void
}

function CardSkeleton() {
  return (
    <div className="flex flex-col rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      <div className="flex flex-col items-center px-6 pt-6 pb-4 space-y-3">
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>
      <div className="px-5 pb-4 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <div className="px-5 pb-5 space-y-2 pt-4 border-t border-gray-50">
        <Skeleton className="h-9 w-full rounded-md" />
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
    </div>
  )
}

function EmptyState({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <SearchX className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">Nenhum psicólogo encontrado</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-xs">
        Tente ajustar os filtros ou ampliar sua busca para encontrar mais resultados.
      </p>
      <Button variant="outline" className="mt-6" onClick={onClearFilters}>
        Limpar filtros
      </Button>
    </div>
  )
}

export function PsychologistGrid({
  psychologists,
  loading,
  total,
  totalPages,
  currentPage,
  onPageChange,
  onClearFilters,
}: PsychologistGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!psychologists.length) {
    return (
      <div className="grid grid-cols-1">
        <EmptyState onClearFilters={onClearFilters} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        {total} psicólogo{total !== 1 ? 's' : ''} encontrado{total !== 1 ? 's' : ''}
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {psychologists.map((psi) => (
          <PsychologistCard key={psi.id} psychologist={psi} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Anterior
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              const page = i + 1
              return (
                <Button
                  key={page}
                  variant={page === currentPage ? 'default' : 'outline'}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </Button>
              )
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Próximo
          </Button>
        </div>
      )}
    </div>
  )
}
