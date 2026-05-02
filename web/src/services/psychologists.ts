import { api } from '@/lib/api'
import type { MasterData, SearchParams, SearchResult, Psychologist, CredCity } from '@/types'

export async function getMasterData(): Promise<MasterData> {
  const { data } = await api.get('/credenciamento/master-data')
  return data
}

export async function getCitiesByState(stateId: string): Promise<CredCity[]> {
  const { data } = await api.get(`/credenciamento/master-data/states/${stateId}/cities`)
  return data
}

export async function searchPsychologists(params: SearchParams): Promise<SearchResult> {
  const { data } = await api.get('/credenciamento/psychologists', { params })
  return data
}

export async function getPsychologistBySlug(slug: string): Promise<Psychologist> {
  const { data } = await api.get(`/credenciamento/psychologists/${slug}`)
  return data
}
