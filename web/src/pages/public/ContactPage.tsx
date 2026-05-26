import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { PageLayout } from '@/components/common/PageLayout'

const contactItems = [
  {
    icon: Phone,
    label: 'Telefone / WhatsApp',
    value: '(35) 99921-2891',
    href: 'https://wa.me/5535999212891',
  },
  {
    icon: Mail,
    label: 'E-mail',
    value: 'contato@iappm.com.br',
    href: 'mailto:contato@iappm.com.br',
  },
  {
    icon: Mail,
    label: 'Credenciamento',
    value: 'credenciado@iappm.com.br',
    href: 'mailto:credenciado@iappm.com.br',
  },
  {
    icon: Clock,
    label: 'Horário de atendimento',
    value: 'Segunda a Sexta, 8h–18h',
    href: undefined,
  },
  {
    icon: MapPin,
    label: 'Localização',
    value: 'Minas Gerais, Brasil',
    href: undefined,
  },
]

export function ContactPage() {
  return (
    <PageLayout>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 py-16 md:py-20 text-white">
        <div className="page-container text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-300 mb-3">Fale conosco</p>
          <h1 className="text-4xl font-extrabold md:text-5xl">Contato</h1>
          <p className="mt-4 text-primary-100 max-w-xl mx-auto text-base leading-relaxed">
            Tem dúvidas? Estamos aqui para ajudar. Entre em contato pelo canal que preferir.
          </p>
        </div>
      </section>

      {/* Contact info */}
      <section className="bg-white py-16 md:py-20">
        <div className="page-container max-w-3xl mx-auto">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {contactItems.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50 p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50">
                  <Icon className="h-5 w-5 text-primary-700" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary-700 hover:underline"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-gray-900">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-semibold text-amber-800 mb-1">Em caso de crise</p>
            <p className="text-sm text-amber-700">
              Ligue <strong>188</strong> (CVV — Centro de Valorização da Vida) ou <strong>192</strong> (SAMU) imediatamente.
              Estes serviços funcionam 24 horas por dia, 7 dias por semana.
            </p>
          </div>
        </div>
      </section>

    </PageLayout>
  )
}
