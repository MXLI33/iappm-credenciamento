import { Link } from 'react-router-dom'
import { CheckCircle2, Mail, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SuccessScreenProps {
  protocol: string
  email: string
}

export function SuccessScreen({ protocol, email }: SuccessScreenProps) {
  return (
    <div className="flex flex-col items-center text-center py-8">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-100">
        <CheckCircle2 className="h-10 w-10 text-primary" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-foreground">Solicitação enviada!</h2>
      <p className="mt-2 text-muted-foreground max-w-sm">
        Sua solicitação de credenciamento foi recebida com sucesso. Nossa equipe irá analisar sua documentação.
      </p>

      <div className="mt-8 w-full max-w-sm rounded-xl border border-primary-100 bg-primary-50 p-5 text-left space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-100">
            <span className="text-xs font-bold text-primary-700">#</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Número de protocolo</p>
            <p className="font-semibold text-primary-700 text-lg tracking-wide">{protocol}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-100">
            <Mail className="h-4 w-4 text-primary-700" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Confirmação enviada para</p>
            <p className="text-sm font-medium text-foreground">{email}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-100">
            <Clock className="h-4 w-4 text-primary-700" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Prazo de análise</p>
            <p className="text-sm font-medium text-foreground">Até 5 dias úteis</p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground max-w-xs">
        Guarde seu número de protocolo. Você será notificado por e-mail sobre o andamento da análise.
      </p>

      <div className="mt-8 flex flex-col gap-3 w-full max-w-xs">
        <Button asChild>
          <Link to="/psicologos">Ver psicólogos credenciados</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/">Voltar ao início</Link>
        </Button>
      </div>
    </div>
  )
}
