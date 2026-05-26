import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Globe, Calendar, CreditCard, TrendingUp, Shield, Star, Users, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/common/PageLayout'

const stats = [
  { icon: Users, value: '280+', label: 'Psicólogos credenciados' },
  { icon: Shield, value: '100%', label: 'CRP verificado' },
  { icon: Star, value: '4.9', label: 'Avaliação média' },
  { icon: Globe, value: '27', label: 'Estados atendidos' },
]

const steps = [
  {
    step: '01',
    title: 'Busque',
    desc: 'Use os filtros para encontrar psicólogos por especialidade, cidade, abordagem terapêutica ou idioma.',
  },
  {
    step: '02',
    title: 'Escolha',
    desc: 'Veja perfis completos com CRP verificado, bio, especialidades e valor da consulta.',
  },
  {
    step: '03',
    title: 'Conecte',
    desc: 'Entre em contato diretamente pelo WhatsApp e agende sua primeira sessão.',
  },
]

const benefits = [
  { icon: Globe, title: 'Alcance nacional', desc: 'Atenda pacientes em todo o Brasil, online ou presencialmente.' },
  { icon: Calendar, title: 'Agenda própria', desc: 'Você define seus horários e modalidade de atendimento.' },
  { icon: CreditCard, title: 'Pagamento direto', desc: 'Receba diretamente do paciente, sem intermediários.' },
  { icon: TrendingUp, title: 'Mais visibilidade', desc: 'Perfil otimizado para buscas e indicações.' },
]

const specialties = [
  'Ansiedade', 'Depressão', 'TCC', 'Psicanálise', 'Trauma e TEPT',
  'Relacionamentos', 'Autoestima', 'TDAH', 'Luto', 'Fobia Social',
  'Burnout', 'Autismo (TEA)',
]

export function HomePage() {
  return (
    <PageLayout>

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        <div className="page-container relative py-20 md:py-28 lg:py-32 text-white">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-primary-100 mb-6">
              <Shield className="h-3.5 w-3.5" />
              Plataforma com psicólogos verificados pelo CFP
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Encontre seu psicólogo{' '}
              <span className="text-primary-300">credenciado</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-primary-100 leading-relaxed max-w-xl mx-auto">
              Conectamos você a profissionais de saúde mental qualificados, com CRP verificado e atendimento em todo o Brasil.
            </p>

            {/* Search CTA */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Especialidade, nome ou cidade..."
                  readOnly
                  onClick={() => window.location.href = '/psicologos'}
                  className="w-full h-12 pl-10 pr-4 rounded-xl bg-white text-gray-900 text-sm placeholder-gray-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-300"
                />
              </div>
              <Button
                size="lg"
                className="w-full sm:w-auto h-12 px-7 bg-white text-primary-800 hover:bg-primary-50 font-semibold shrink-0"
                asChild
              >
                <Link to="/psicologos">Buscar</Link>
              </Button>
            </div>

            {/* Trust signals */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-primary-200">
              {['CRP verificado', 'Atendimento nacional', 'LGPD em conformidade', 'Gratuito para pacientes'].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-primary-300 shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="page-container py-10">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50">
                  <Icon className="h-5 w-5 text-primary-700" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-xs text-muted-foreground leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Como funciona ── */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="page-container">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-600 mb-2">Simples assim</p>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Como funciona?</h2>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto">
              Em três passos você encontra e agenda com seu psicólogo ideal.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="relative bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-5xl font-extrabold text-primary-50 leading-none select-none">{step}</span>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button size="lg" className="bg-primary-700 hover:bg-primary-800 px-8" asChild>
              <Link to="/psicologos">
                Encontrar meu psicólogo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Especialidades populares ── */}
      <section className="bg-white py-16 md:py-20 border-y border-gray-100">
        <div className="page-container">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-600 mb-2">O que você está buscando?</p>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Especialidades em destaque</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {specialties.map((s) => (
              <Link
                key={s}
                to={`/psicologos?name=${encodeURIComponent(s)}`}
                className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 transition-colors"
              >
                {s}
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/psicologos" className="text-sm font-medium text-primary-700 hover:underline inline-flex items-center gap-1">
              Ver todos os psicólogos
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Para psicólogos ── */}
      <section className="bg-primary-800 py-16 md:py-20 text-white">
        <div className="page-container">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-300 mb-3">Para profissionais</p>
              <h2 className="text-3xl font-bold md:text-4xl leading-tight">
                Expanda sua atuação.<br />
                Conquiste mais pacientes.
              </h2>
              <p className="mt-4 text-primary-200 leading-relaxed max-w-md">
                A IAPPM conecta você a quem precisa de apoio psicológico. Crie seu perfil, alcance pacientes em todo o Brasil e atenda com total autonomia.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {benefits.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                      <Icon className="h-4.5 w-4.5 text-primary-200" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <p className="text-xs text-primary-300 leading-relaxed mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="mt-10 bg-white text-primary-800 hover:bg-primary-50 font-semibold px-8"
                asChild
              >
                <Link to="/credenciar">
                  Quero me credenciar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Right side card */}
            <div className="hidden lg:flex justify-end">
              <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-6 w-full max-w-sm space-y-4">
                <p className="text-sm font-semibold text-primary-200 uppercase tracking-wider">Processo de credenciamento</p>
                {[
                  { n: '1', text: 'Preencha o formulário online' },
                  { n: '2', text: 'Envie seus documentos e CRP' },
                  { n: '3', text: 'Aguarde a análise (até 3 dias úteis)' },
                  { n: '4', text: 'Perfil publicado automaticamente' },
                ].map(({ n, text }) => (
                  <div key={n} className="flex items-center gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                      {n}
                    </div>
                    <p className="text-sm text-primary-100">{text}</p>
                  </div>
                ))}
                <div className="pt-2 border-t border-white/20">
                  <p className="text-xs text-primary-300">100% gratuito. Sem taxa de adesão.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="page-container text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Pronto para começar?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            Milhares de brasileiros já encontraram apoio psicológico pela IAPPM. Você pode ser o próximo.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-primary-700 hover:bg-primary-800 px-8" asChild>
              <Link to="/psicologos">Quero iniciar psicoterapia</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 px-8" asChild>
              <Link to="/como-funciona">Saiba mais</Link>
            </Button>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Em caso de crise, ligue <strong>188</strong> (CVV) ou <strong>192</strong> (SAMU).
          </p>
        </div>
      </section>

    </PageLayout>
  )
}
