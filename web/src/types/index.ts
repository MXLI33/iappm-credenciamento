export interface MasterItem {
  id: string
  name: string
}

export interface CredState extends MasterItem {
  uf: string
}

export interface CredCity extends MasterItem {
  stateId: string
}

export interface MasterData {
  specialties: MasterItem[]
  approaches: MasterItem[]
  ageGroups: MasterItem[]
  languages: MasterItem[]
  states: CredState[]
}

export type Modalidade = 'online' | 'presencial' | 'ambos'

export interface Psychologist {
  id: string
  slug: string
  name: string
  crp: string
  photoUrl: string | null
  bio: string | null
  consultFee: string | null
  modalidade: Modalidade
  whatsapp: string
  state: { name: string; uf: string } | null
  city: { name: string } | null
  specialties: MasterItem[]
  approaches: MasterItem[]
  ageGroups: MasterItem[]
  languages: MasterItem[]
}

export interface SearchParams {
  name?: string
  specialtyId?: string
  approachId?: string
  ageGroupId?: string
  languageId?: string
  stateId?: string
  cityId?: string
  modalidade?: string
  page?: number
  limit?: number
}

export interface SearchResult {
  data: Psychologist[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
