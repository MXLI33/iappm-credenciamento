import { Link } from 'react-router-dom'
import { Globe, Calendar, CreditCard, Eye, ShieldCheck, Star, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/common/PageLayout'

const stats = [
  { icon: Users, value: '280+', label: 'Psicólogos credenciados' },
  { icon: ShieldCheck, value: '100%', label: 'CRP verificado' },
  { icon: Star, value: '4.9', label: 'Avaliação média' },
]

const benefits = [
  { icon: Globe, title: 'Atendimento', subtitle: 'em todo o Brasil' },
  { icon: Calendar, title: 'Autonomia', subtitle: 'na agenda' },
  { icon: CreditCard, title: 'Pagamento direto', subtitle: 'do Cliente/Paciente' },
  { icon: Eye, title: 'Mais visibilidade', subtitle: '' },
]

export function HomePage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 py-20 md:py-28 text-white">
        <div className="page-container text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur shadow-lg">
            <span className="text-2xl font-extrabold text-white">IA</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            IAPPM
          </h1>
          <p className="mt-3 text-primary-100 text-lg font-medium">
            Instituto de Apoio à Psicologia e Saúde Mental
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-primary-800 hover:bg-primary-50 font-semibold px-8"
              asChild
            >
              <Link to="/psicologos">Quero Começar a Psicoterapia</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white/50 text-white hover:bg-white/10 px-8"
              asChild
            >
              <Link to="/credenciar">Sou Psicólogo(a)</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white/50 text-white hover:bg-white/10 px-8"
              asChild
            >
              <Link to="/como-funciona">Como Funciona</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="page-container">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Psychologist CTA — matches image8.jpeg */}
      <section className="bg-primary-800 py-16 text-white">
        <div className="page-container text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Quero atender na IAPPM</h2>
          <p className="mt-3 text-primary-200 max-w-lg mx-auto">
            A IAPPM conecta você a oportunidades de atendimento com mais autonomia, visibilidade e alcance em todo o Brasil.
          </p>

          <div className="mx-auto mt-8 max-w-2xl rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
                <span className="text-lg font-bold text-white">IA</span>
              </div>
              <p className="text-sm text-primary-100 text-left leading-relaxed">
                Melhore o seu atendimento na IAPPM com qualidade e autonomia para levar seu profissionalismo a um novo patamar
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {benefits.map(({ icon: Icon, title, subtitle }) => (
                <div key={title} className="flex flex-col items-center gap-2 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                    <Icon className="h-5 w-5 text-primary-200" />
                  </div>
                  <p className="text-sm font-medium text-white">{title}</p>
                  {subtitle && <p className="text-xs text-primary-300">{subtitle}</p>}
                </div>
              ))}
            </div>
          </div>

          <Button
            size="lg"
            className="mt-8 bg-white text-primary-800 hover:bg-primary-50 font-semibold px-10"
            asChild
          >
            <Link to="/credenciar">Quero Credenciar</Link>
          </Button>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-16">
        <div className="page-container text-center">
          <h2 className="text-3xl font-bold text-foreground">Como funciona?</h2>
          <p className="mt-2 text-muted-foreground">Em três passos simples</p>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { step: '1', title: 'Busque', desc: 'Filtre por especialidade, cidade, abordagem ou idioma.' },
              { step: '2', title: 'Escolha', desc: 'Veja perfis detalhados com CRP verificado e avaliações.' },
              { step: '3', title: 'Conecte', desc: 'Entre em contato diretamente via WhatsApp ou e-mail.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center rounded-xl bg-white p-6 shadow-sm border border-gray-100 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {step}
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
          <Button className="mt-10" size="lg" asChild>
            <Link to="/psicologos">Encontrar meu psicólogo</Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  )
}
