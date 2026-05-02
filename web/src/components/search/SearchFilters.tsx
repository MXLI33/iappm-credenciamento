import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getMasterData, getCitiesByState } from '@/services/psychologists'
import type { SearchParams } from '@/types'

interface SearchFiltersProps {
  onSearch: (params: SearchParams) => void
  loading?: boolean
}

const modalidades = [
  { value: 'all', label: 'Todas modalidades' },
  { value: 'online', label: 'Online' },
  { value: 'presencial', label: 'Presencial' },
  { value: 'ambos', label: 'Online e Presencial' },
]

export function SearchFilters({ onSearch, loading }: SearchFiltersProps) {
  const [name, setName] = useState('')
  const [specialtyId, setSpecialtyId] = useState('all')
  const [approachId, setApproachId] = useState('all')
  const [ageGroupId, setAgeGroupId] = useState('all')
  const [languageId, setLanguageId] = useState('all')
  const [stateId, setStateId] = useState('all')
  const [cityId, setCityId] = useState('all')
  const [modalidade, setModalidade] = useState('all')

  const { data: master } = useQuery({
    queryKey: ['master-data'],
    queryFn: getMasterData,
  })

  const { data: cities } = useQuery({
    queryKey: ['cities', stateId],
    queryFn: () => getCitiesByState(stateId),
    enabled: stateId !== 'all',
  })

  useEffect(() => {
    setCityId('all')
  }, [stateId])

  function handleSearch() {
    onSearch({
      name: name.trim() || undefined,
      specialtyId: specialtyId !== 'all' ? specialtyId : undefined,
      approachId: approachId !== 'all' ? approachId : undefined,
      ageGroupId: ageGroupId !== 'all' ? ageGroupId : undefined,
      languageId: languageId !== 'all' ? languageId : undefined,
      stateId: stateId !== 'all' ? stateId : undefined,
      cityId: cityId !== 'all' ? cityId : undefined,
      modalidade: modalidade !== 'all' ? modalidade : undefined,
      page: 1,
    })
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="w-full space-y-3">
      {/* Row 1 — dropdowns */}
      <div className="flex flex-wrap gap-2">
        <Select value={specialtyId} onValueChange={setSpecialtyId}>
          <SelectTrigger className="h-10 w-full sm:w-48 bg-white">
            <SelectValue placeholder="Especialidades" />
          </SelectTrigger>
          <SelectContent className="max-h-64">
            <SelectItem value="all">Todas especialidades</SelectItem>
            {master?.specialties.map((s) => (
              <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={approachId} onValueChange={setApproachId}>
          <SelectTrigger className="h-10 w-full sm:w-56 bg-white">
            <SelectValue placeholder="Abordagens Terapêuticas" />
          </SelectTrigger>
          <SelectContent className="max-h-64">
            <SelectItem value="all">Todas abordagens</SelectItem>
            {master?.approaches.map((a) => (
              <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={ageGroupId} onValueChange={setAgeGroupId}>
          <SelectTrigger className="h-10 w-full sm:w-48 bg-white">
            <SelectValue placeholder="Públicos Atendidos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os públicos</SelectItem>
            {master?.ageGroups.map((ag) => (
              <SelectItem key={ag.id} value={ag.id}>{ag.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={languageId} onValueChange={setLanguageId}>
          <SelectTrigger className="h-10 w-full sm:w-36 bg-white">
            <SelectValue placeholder="Idiomas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos idiomas</SelectItem>
            {master?.languages.map((l) => (
              <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={modalidade} onValueChange={setModalidade}>
          <SelectTrigger className="h-10 w-full sm:w-48 bg-white">
            <SelectValue placeholder="Modalidade" />
          </SelectTrigger>
          <SelectContent>
            {modalidades.map((m) => (
              <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Row 2 — name + state + city + button */}
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por nome..."
            className="pl-9 h-10 bg-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <Select value={stateId} onValueChange={setStateId}>
          <SelectTrigger className="h-10 w-full sm:w-40 bg-white">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent className="max-h-64">
            <SelectItem value="all">Todos estados</SelectItem>
            {master?.states.map((s) => (
              <SelectItem key={s.id} value={s.id}>{s.uf} — {s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={cityId}
          onValueChange={setCityId}
          disabled={stateId === 'all' || !cities?.length}
        >
          <SelectTrigger className="h-10 w-full sm:w-44 bg-white">
            <SelectValue placeholder="Cidade" />
          </SelectTrigger>
          <SelectContent className="max-h-64">
            <SelectItem value="all">Todas cidades</SelectItem>
            {cities?.map((c) => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          className="h-10 px-6 shrink-0 w-full sm:w-auto"
          onClick={handleSearch}
          disabled={loading}
        >
          <Search className="mr-2 h-4 w-4" />
          Buscar Psicólogo
        </Button>
      </div>
    </div>
  )
}
