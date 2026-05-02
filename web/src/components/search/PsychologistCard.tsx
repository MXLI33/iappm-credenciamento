import { Link } from 'react-router-dom'
import { MapPin, Monitor, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Psychologist } from '@/types'

interface PsychologistCardProps {
  psychologist: Psychologist
}

const modalidadeLabel: Record<string, string> = {
  online: 'Online',
  presencial: 'Presencial',
  ambos: 'Online e Presencial',
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function PsychologistCard({ psychologist: psi }: PsychologistCardProps) {
  const initials = psi.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  const whatsappUrl = `https://wa.me/55${psi.whatsapp.replace(/\D/g, '')}`
  const location = [psi.city?.name, psi.state?.uf].filter(Boolean).join(' — ')

  return (
    <div className="group flex flex-col rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md overflow-hidden">
      {/* Photo */}
      <div className="flex flex-col items-center px-6 pt-6 pb-4">
        <Avatar className="h-24 w-24 border-4 border-primary-100 shadow-sm">
          <AvatarImage src={psi.photoUrl ?? undefined} alt={psi.name} />
          <AvatarFallback className="bg-primary-50 text-primary-700 text-xl font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        <h3 className="mt-3 text-base font-semibold text-primary-700 text-center leading-snug">
          {psi.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">CRP {psi.crp}</p>

        {psi.consultFee && (
          <p className="text-xs text-primary-600 font-medium mt-1">
            A partir de R$ {Number(psi.consultFee).toFixed(0)}
          </p>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 px-5 pb-4 space-y-2">
        {psi.specialties.length > 0 && (
          <div className="flex items-start gap-1.5">
            <span className="mt-0.5 h-2 w-2 rounded-full bg-primary-500 shrink-0" />
            <p className="text-xs text-muted-foreground line-clamp-2">
              {psi.specialties.slice(0, 3).map((s) => s.name).join(', ')}
            </p>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          {psi.modalidade === 'online' ? (
            <Monitor className="h-3.5 w-3.5 text-accent shrink-0" />
          ) : (
            <User className="h-3.5 w-3.5 text-accent shrink-0" />
          )}
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Atendimento:</span>{' '}
            {modalidadeLabel[psi.modalidade]}
          </p>
        </div>

        {location && (
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <p className="text-xs text-muted-foreground">{location}</p>
          </div>
        )}

        {psi.approaches.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {psi.approaches.slice(0, 2).map((a) => (
              <Badge
                key={a.id}
                variant="outline"
                className="text-[10px] px-1.5 py-0 border-primary-200 text-primary-700"
              >
                {a.name.split('(')[0].trim()}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-5 pb-5 space-y-2 border-t border-gray-50 pt-4">
        <Button className="w-full h-9 text-sm" asChild>
          <Link to={`/psicologos/${psi.slug}`}>Ver Perfil</Link>
        </Button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full h-9 rounded-md bg-[#25D366] text-white text-sm font-medium hover:bg-[#20ba58] transition-colors"
        >
          <WhatsAppIcon />
          Falar no WhatsApp
        </a>
      </div>
    </div>
  )
}
