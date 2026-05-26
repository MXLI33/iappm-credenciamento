import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Eye, Search } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { listApplications } from '@/services/admin'

const STATUS_TABS = [
  { value: '', label: 'Todas' },
  { value: 'pending', label: 'Pendentes' },
  { value: 'under_review', label: 'Em análise' },
  { value: 'approved', label: 'Aprovadas' },
  { value: 'rejected', label: 'Rejeitadas' },
]

export function ApplicationsPage() {
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const { data, isFetching } = useQuery({
    queryKey: ['admin-applications', status, page],
    queryFn: () => listApplications(status || undefined, page),
    placeholderData: (prev) => prev,
  })

  const filtered = search
    ? data?.data.filter(
        (a) =>
          a.name.toLowerCase().includes(search.toLowerCase()) ||
          a.protocol.includes(search) ||
          a.crp.includes(search),
      )
    : data?.data

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Admin header */}
      <header className="border-b border-gray-100 bg-white px-6 h-16 flex items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Logo size="md" asLink={false} />
            <div className="hidden sm:block h-5 w-px bg-gray-200" />
            <p className="hidden sm:block text-sm text-muted-foreground">Painel Administrativo</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/psicologos">Ver plataforma</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Solicitações de Credenciamento</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {data?.meta.total ?? 0} solicitação(ões) no total
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Tabs value={status} onValueChange={(v) => { setStatus(v); setPage(1) }}>
              <TabsList>
                {STATUS_TABS.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="text-xs">
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, protocolo, CRP..."
                className="pl-9 h-9 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Protocolo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Nome</th>
                  <th className="hidden px-4 py-3 text-left text-xs font-medium text-muted-foreground md:table-cell">CRP</th>
                  <th className="hidden px-4 py-3 text-left text-xs font-medium text-muted-foreground lg:table-cell">Localização</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
                  <th className="hidden px-4 py-3 text-left text-xs font-medium text-muted-foreground sm:table-cell">Data</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {isFetching && !data ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      {Array.from({ length: 6 }).map((_, j) => (
                        <td key={j} className="px-4 py-3">
                          <Skeleton className="h-4 w-full" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : filtered?.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-sm text-muted-foreground">
                      Nenhuma solicitação encontrada
                    </td>
                  </tr>
                ) : (
                  filtered?.map((app) => (
                    <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{app.protocol}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-foreground">{app.name}</p>
                        <p className="text-xs text-muted-foreground">{app.email}</p>
                      </td>
                      <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                        {app.crp}/{app.crpState}
                      </td>
                      <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">
                        {app.city?.name ? `${app.city.name} — ${app.state?.uf}` : app.state?.uf ?? '—'}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={app.status} />
                      </td>
                      <td className="hidden px-4 py-3 text-xs text-muted-foreground sm:table-cell">
                        {format(new Date(app.createdAt), "dd/MM/yyyy", { locale: ptBR })}
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/admin/credenciamento/${app.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {data && data.meta.totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
                <p className="text-xs text-muted-foreground">
                  Página {data.meta.page} de {data.meta.totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    Anterior
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === data.meta.totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Próximo
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
