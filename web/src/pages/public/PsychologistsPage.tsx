import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { SearchFilters } from '@/components/search/SearchFilters'
import { PsychologistGrid } from '@/components/search/PsychologistGrid'
import { searchPsychologists } from '@/services/psychologists'
import { Footer } from '@/components/common/Footer'
import type { SearchParams } from '@/types'

const defaultParams: SearchParams = { page: 1, limit: 12 }

export function PsychologistsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [params, setParams] = useState<SearchParams>(() => ({
    ...defaultParams,
    name: searchParams.get('name') ?? undefined,
    specialtyId: searchParams.get('specialtyId') ?? undefined,
    approachId: searchParams.get('approachId') ?? undefined,
    ageGroupId: searchParams.get('ageGroupId') ?? undefined,
    languageId: searchParams.get('languageId') ?? undefined,
    stateId: searchParams.get('stateId') ?? undefined,
    cityId: searchParams.get('cityId') ?? undefined,
    modalidade: searchParams.get('modalidade') ?? undefined,
    page: Number(searchParams.get('page') ?? 1),
  }))

  const { data, isFetching } = useQuery({
    queryKey: ['psychologists', params],
    queryFn: () => searchPsychologists(params),
    placeholderData: (prev) => prev,
  })

  useEffect(() => {
    const next = new URLSearchParams()
    if (params.name) next.set('name', params.name)
    if (params.specialtyId) next.set('specialtyId', params.specialtyId)
    if (params.approachId) next.set('approachId', params.approachId)
    if (params.ageGroupId) next.set('ageGroupId', params.ageGroupId)
    if (params.languageId) next.set('languageId', params.languageId)
    if (params.stateId) next.set('stateId', params.stateId)
    if (params.cityId) next.set('cityId', params.cityId)
    if (params.modalidade) next.set('modalidade', params.modalidade)
    if (params.page && params.page > 1) next.set('page', String(params.page))
    setSearchParams(next, { replace: true })
  }, [params, setSearchParams])

  function handleSearch(newParams: SearchParams) {
    setParams({ ...newParams, limit: 12 })
  }

  function handlePageChange(page: number) {
    setParams((prev) => ({ ...prev, page }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleClearFilters() {
    setParams(defaultParams)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-gradient-to-b from-primary-800 to-primary-700 pb-8 pt-6">
        <div className="page-container">
          {/* Top nav */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                <span className="text-sm font-bold text-white">IA</span>
              </div>
              <span className="hidden font-bold text-white sm:block text-lg">IAPPM</span>
            </Link>

            <nav className="flex items-center gap-2">
              <Link
                to="/credenciar"
                className="flex items-center gap-1.5 rounded-full bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500 transition-colors"
              >
                Quero Começar a Psicoterapia
              </Link>
              <Link
                to="/credenciar"
                className="flex items-center gap-1.5 rounded-full bg-white/10 border border-white/30 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors"
              >
                Sou Psicólogo(a)
              </Link>
              <Link
                to="/como-funciona"
                className="hidden sm:flex items-center gap-1.5 rounded-full bg-white/10 border border-white/30 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors"
              >
                Como Funciona
              </Link>
            </nav>
          </div>

          {/* Filters */}
          <div className="rounded-xl bg-white/10 backdrop-blur border border-white/20 p-4">
            <SearchFilters onSearch={handleSearch} loading={isFetching} />
          </div>
        </div>
      </header>

      {/* Results */}
      <main className="flex-1 bg-gray-50">
        <div className="page-container py-8">
          <PsychologistGrid
            psychologists={data?.data ?? []}
            loading={isFetching && !data}
            total={data?.meta.total ?? 0}
            totalPages={data?.meta.totalPages ?? 1}
            currentPage={params.page ?? 1}
            onPageChange={handlePageChange}
            onClearFilters={handleClearFilters}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
