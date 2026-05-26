import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Navbar } from '@/components/common/Navbar'
import { Footer } from '@/components/common/Footer'
import { SearchFilters } from '@/components/search/SearchFilters'
import { PsychologistGrid } from '@/components/search/PsychologistGrid'
import { searchPsychologists } from '@/services/psychologists'
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
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />

      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="page-container py-6">
          <h1 className="text-xl font-bold text-gray-900">Encontre seu psicólogo</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Psicólogos credenciados com CRP verificado em todo o Brasil
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="page-container py-4">
          <SearchFilters onSearch={handleSearch} loading={isFetching} />
        </div>
      </div>

      {/* Results */}
      <main className="flex-1">
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
