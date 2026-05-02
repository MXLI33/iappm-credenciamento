import { api } from '@/lib/api'

export interface ApplicationListItem {
  id: string
  protocol: string
  name: string
  crp: string
  crpState: string
  email: string
  whatsapp: string
  modalidade: string
  status: 'pending' | 'under_review' | 'approved' | 'rejected'
  createdAt: string
  reviewedAt: string | null
  state: { name: string; uf: string } | null
  city: { name: string } | null
}

export interface ApplicationDetail extends ApplicationListItem {
  cpfHash: string
  bio: string | null
  graduationYear: number | null
  consultFee: string | null
  specialties: string[]
  approaches: string[]
  ageGroups: string[]
  languages: string[]
  photoPath: string | null
  diplomaPath: string | null
  crpCardPath: string | null
  idDocPath: string | null
  adminNotes: string | null
  rejectReason: string | null
  psychologistId: string | null
}

export async function listApplications(status?: string, page = 1) {
  const { data } = await api.get('/credenciamento/admin/applications', {
    params: { status, page, limit: 20 },
  })
  return data as { data: ApplicationListItem[]; meta: { total: number; totalPages: number; page: number } }
}

export async function getApplication(id: string) {
  const { data } = await api.get(`/credenciamento/admin/applications/${id}`)
  return data as ApplicationDetail
}

export async function markUnderReview(id: string) {
  await api.patch(`/credenciamento/admin/applications/${id}/review`)
}

export async function approveApplication(id: string, adminNotes?: string) {
  const { data } = await api.post(`/credenciamento/admin/applications/${id}/approve`, { adminNotes })
  return data as { psychologistId: string; slug: string }
}

export async function rejectApplication(id: string, rejectReason: string, adminNotes?: string) {
  await api.post(`/credenciamento/admin/applications/${id}/reject`, { rejectReason, adminNotes })
}
