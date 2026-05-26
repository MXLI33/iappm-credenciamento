import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin, Monitor, Users, MessageCircle, AlertCircle } from 'lucide-react'
import { PageLayout } from '@/components/common/PageLayout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { getPsychologistBySlug } from '@/services/psychologists'
import type { Psychologist } from '@/types'

const modalidadeLabel: Record<string, string> = {
  online: 'Online',
  presencial: 'Presencial',
  ambos: 'Online e Presencial',
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function ProfileSkeleton() {
  return (
    <div className="page-container py-10 max-w-3xl mx-auto">
      <Skeleton className="h-4 w-32 mb-8" />
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <Skeleton className="h-32 w-32 rounded-full shrink-0" />
        <div className="flex-1 space-y-3 w-full">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
      <Skeleton className="h-24 w-full mt-8" />
      <Skeleton className="h-16 w-full mt-6" />
    </div>
  )
}

export function PsychologistProfilePage() {
  const { slug } = useParams<{ slug: string }>()
  const [psi, setPsi] = useState<Psychologist | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getPsychologistBySlug(slug)
      .then(setPsi)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <PageLayout>
        <ProfileSkeleton />
      </PageLayout>
    )
  }

  if (notFound || !psi) {
    return (
      <PageLayout>
        <div className="page-container py-20 max-w-3xl mx-auto text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground">Psicólogo não encontrado</h1>
          <p className="mt-2 text-muted-foreground">Este perfil não está disponível.</p>
          <Button className="mt-6" asChild>
            <Link to="/psicologos">Ver todos os psicólogos</Link>
          </Button>
        </div>
      </PageLayout>
    )
  }

  const initials = psi.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  const whatsappUrl = `https://wa.me/55${psi.whatsapp.replace(/\D/g, '')}`
  const location = [psi.city?.name, psi.state?.name].filter(Boolean).join(', ')

  return (
    <PageLayout>
      <div className="page-container py-10 max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          to="/psicologos"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary-700 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a lista
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <Avatar className="h-32 w-32 border-4 border-primary-100 shadow-sm shrink-0">
            <AvatarImage src={psi.photoUrl ?? undefined} alt={psi.name} />
            <AvatarFallback className="bg-primary-50 text-primary-700 text-3xl font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-foreground">{psi.name}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">CRP {psi.crp}</p>

            {psi.consultFee && (
              <p className="text-sm font-medium text-primary-600 mt-1">
                Consulta a partir de R$ {Number(psi.consultFee).toFixed(0)}
              </p>
            )}

            <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-3 text-sm text-muted-foreground">
              {psi.modalidade && (
                <span className="flex items-center gap-1.5">
                  <Monitor className="h-4 w-4 text-accent shrink-0" />
                  {modalidadeLabel[psi.modalidade]}
                </span>
              )}
              {location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 shrink-0" />
                  {location}
                </span>
              )}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#20ba58] transition-colors"
            >
              <WhatsAppIcon />
              Agendar via WhatsApp
            </a>
          </div>
        </div>

        <hr className="my-8 border-gray-100" />

        {/* Bio */}
        {psi.bio && (
          <section className="mb-8">
            <h2 className="text-base font-semibold text-foreground mb-2">Sobre</h2>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{psi.bio}</p>
          </section>
        )}

        {/* Tags sections */}
        {psi.specialties.length > 0 && (
          <section className="mb-6">
            <h2 className="text-base font-semibold text-foreground mb-2">Especialidades</h2>
            <div className="flex flex-wrap gap-2">
              {psi.specialties.map((s) => (
                <Badge key={s.id} className="bg-primary-50 text-primary-700 border-primary-200 hover:bg-primary-100">
                  {s.name}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {psi.approaches.length > 0 && (
          <section className="mb-6">
            <h2 className="text-base font-semibold text-foreground mb-2">Abordagens</h2>
            <div className="flex flex-wrap gap-2">
              {psi.approaches.map((a) => (
                <Badge key={a.id} variant="outline" className="border-primary-200 text-primary-700">
                  {a.name}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {psi.ageGroups.length > 0 && (
          <section className="mb-6">
            <h2 className="text-base font-semibold text-foreground mb-2">Público atendido</h2>
            <div className="flex flex-wrap gap-2">
              {psi.ageGroups.map((ag) => (
                <Badge key={ag.id} variant="outline" className="border-accent/40 text-accent">
                  <Users className="h-3 w-3 mr-1" />
                  {ag.name}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {psi.languages.length > 0 && (
          <section className="mb-6">
            <h2 className="text-base font-semibold text-foreground mb-2">Idiomas</h2>
            <div className="flex flex-wrap gap-2">
              {psi.languages.map((l) => (
                <Badge key={l.id} variant="outline" className="border-gray-200 text-muted-foreground">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  {l.name}
                </Badge>
              ))}
            </div>
          </section>
        )}

        <hr className="my-8 border-gray-100" />

        {/* Bottom CTA */}
        <div className="text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-8 py-3 text-base font-medium text-white hover:bg-[#20ba58] transition-colors"
          >
            <WhatsAppIcon />
            Falar com {psi.name.split(' ')[0]}
          </a>
        </div>

        {/* Responsável técnico + legal disclaimer */}
        <div className="mt-8 rounded-xl border border-gray-100 bg-gray-50 p-4 text-xs text-muted-foreground leading-relaxed space-y-2">
          <p>
            <span className="font-semibold text-gray-700">Responsável técnico:</span>{' '}
            {psi.name} — CRP {psi.crp}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Atenção:</span> Este serviço não substitui urgência ou emergência psiquiátrica.
            Em caso de crise, ligue <strong>188</strong> (CVV) ou <strong>192</strong> (SAMU).
          </p>
          <p>
            As informações deste perfil são de responsabilidade do profissional credenciado.
            Verifique o registro no Conselho Federal de Psicologia (CFP).
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
