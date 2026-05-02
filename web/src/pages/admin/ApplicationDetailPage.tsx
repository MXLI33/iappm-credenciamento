import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowLeft, CheckCircle2, XCircle, Eye, Loader2, FileText, Image } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { StatusBadge } from '@/components/admin/StatusBadge'
import {
  getApplication,
  approveApplication,
  rejectApplication,
  markUnderReview,
} from '@/services/admin'

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

function DocumentLink({ path, label }: { path: string | null; label: string }) {
  if (!path) return <p className="text-sm text-muted-foreground">—</p>
  const url = `${API_BASE}/uploads/credenciamento/${path}`
  const isImage = /\.(jpg|jpeg|png)$/i.test(path)
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
    >
      {isImage ? <Image className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
      {label}
      <Eye className="h-3 w-3 opacity-60" />
    </a>
  )
}

function Field({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground mt-0.5">{value ?? '—'}</p>
    </div>
  )
}

export function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [approveOpen, setApproveOpen] = useState(false)
  const [rejectOpen, setRejectOpen] = useState(false)
  const [adminNotes, setAdminNotes] = useState('')
  const [rejectReason, setRejectReason] = useState('')
  const [rejectError, setRejectError] = useState('')

  const { data: app, isLoading } = useQuery({
    queryKey: ['admin-application', id],
    queryFn: () => getApplication(id!),
    enabled: !!id,
  })

  const reviewMutation = useMutation({
    mutationFn: () => markUnderReview(id!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-application', id] }),
  })

  const approveMutation = useMutation({
    mutationFn: () => approveApplication(id!, adminNotes || undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-application', id] })
      queryClient.invalidateQueries({ queryKey: ['admin-applications'] })
      setApproveOpen(false)
    },
  })

  const rejectMutation = useMutation({
    mutationFn: () => rejectApplication(id!, rejectReason, adminNotes || undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-application', id] })
      queryClient.invalidateQueries({ queryKey: ['admin-applications'] })
      setRejectOpen(false)
    },
  })

  function handleReject() {
    if (!rejectReason.trim()) {
      setRejectError('O motivo é obrigatório')
      return
    }
    setRejectError('')
    rejectMutation.mutate()
  }

  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-4">
        {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
      </div>
    )
  }

  if (!app) return null

  const canAct = app.status === 'pending' || app.status === 'under_review'

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin/credenciamento"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <p className="text-sm font-semibold text-foreground">Detalhe da Solicitação</p>
            <p className="text-xs text-muted-foreground font-mono">{app.protocol}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <StatusBadge status={app.status} />
            {app.status === 'pending' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => reviewMutation.mutate()}
                disabled={reviewMutation.isPending}
              >
                Iniciar análise
              </Button>
            )}
            {canAct && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-destructive text-destructive hover:bg-destructive/10"
                  onClick={() => setRejectOpen(true)}
                >
                  <XCircle className="mr-1.5 h-4 w-4" /> Rejeitar
                </Button>
                <Button size="sm" onClick={() => setApproveOpen(true)}>
                  <CheckCircle2 className="mr-1.5 h-4 w-4" /> Aprovar
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Personal */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-base font-semibold text-foreground mb-4">Dados Pessoais</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Field label="Nome completo" value={app.name} />
              <Field label="E-mail" value={app.email} />
              <Field label="WhatsApp" value={app.whatsapp} />
              <Field label="Data da solicitação" value={format(new Date(app.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })} />
              {app.reviewedAt && <Field label="Data de revisão" value={format(new Date(app.reviewedAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })} />}
            </div>
          </div>

          {/* Professional */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-base font-semibold text-foreground mb-4">Dados Profissionais</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Field label="CRP" value={`${app.crp}/${app.crpState}`} />
              <Field label="Ano de formação" value={app.graduationYear} />
              <Field label="Valor da consulta" value={app.consultFee ? `R$ ${Number(app.consultFee).toFixed(0)}` : undefined} />
              <Field label="Modalidade" value={app.modalidade} />
              <Field label="Estado" value={app.state ? `${app.state.name} (${app.state.uf})` : undefined} />
              <Field label="Cidade" value={app.city?.name} />
            </div>
            {app.bio && (
              <>
                <Separator className="my-4" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Biografia</p>
                  <p className="text-sm text-foreground leading-relaxed">{app.bio}</p>
                </div>
              </>
            )}
          </div>

          {/* Documents */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-base font-semibold text-foreground mb-4">Documentos</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Foto de perfil</p>
                <DocumentLink path={app.photoPath} label="Ver foto" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Diploma</p>
                <DocumentLink path={app.diplomaPath} label="Ver diploma" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Carteira do CRP</p>
                <DocumentLink path={app.crpCardPath} label="Ver CRP" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Documento de identidade</p>
                <DocumentLink path={app.idDocPath} label="Ver documento" />
              </div>
            </div>
          </div>

          {/* Rejection reason */}
          {app.status === 'rejected' && app.rejectReason && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-semibold text-red-800 mb-1">Motivo da rejeição</p>
              <p className="text-sm text-red-700">{app.rejectReason}</p>
            </div>
          )}

          {/* Admin notes */}
          {app.adminNotes && (
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-xs text-muted-foreground mb-1">Notas internas</p>
              <p className="text-sm text-foreground">{app.adminNotes}</p>
            </div>
          )}
        </div>
      </main>

      {/* Approve modal */}
      <Dialog open={approveOpen} onOpenChange={setApproveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aprovar solicitação</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Ao aprovar, o perfil de <strong>{app.name}</strong> será publicado automaticamente e as credenciais de acesso serão enviadas por e-mail.
          </p>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="adminNotesApprove">Notas internas (opcional)</Label>
            <textarea
              id="adminNotesApprove"
              rows={3}
              className="w-full rounded-md border border-input px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Observações internas sobre a aprovação..."
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveOpen(false)}>Cancelar</Button>
            <Button onClick={() => approveMutation.mutate()} disabled={approveMutation.isPending}>
              {approveMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirmar aprovação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject modal */}
      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejeitar solicitação</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            O motivo será enviado por e-mail para <strong>{app.email}</strong>.
          </p>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="rejectReason">Motivo da rejeição *</Label>
            <textarea
              id="rejectReason"
              rows={4}
              className={`w-full rounded-md border px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring ${rejectError ? 'border-destructive' : 'border-input'}`}
              placeholder="Descreva o motivo da rejeição de forma clara e respeitosa..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            {rejectError && <p className="text-xs text-destructive">{rejectError}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="adminNotesReject">Notas internas (opcional)</Label>
            <textarea
              id="adminNotesReject"
              rows={2}
              className="w-full rounded-md border border-input px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Observações internas..."
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectOpen(false)}>Cancelar</Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={rejectMutation.isPending}
            >
              {rejectMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirmar rejeição
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
