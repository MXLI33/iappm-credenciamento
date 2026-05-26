import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Shield, Users, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/common/PageLayout'

const values = [
  {
    icon: Heart,
    title: 'Cuidado com a saúde mental',
    desc: 'Acreditamos que o acesso à saúde mental de qualidade deve ser simples, acessível e sem barreiras para todos os brasileiros.',
  },
  {
    icon: Shield,
    title: 'Segurança e credibilidade',
    desc: 'Todos os psicólogos são verificados pelo CFP antes de serem publicados. Sua segurança é nossa prioridade.',
  },
  {
    icon: Users,
    title: 'Conexão humana',
    desc: 'Facilitamos a conexão entre pessoas e profissionais sem intermediários, respeitando a autonomia de ambos.',
  },
  {
    icon: Target,
    title: 'Transparência total',
    desc: 'Informações claras, sem surpresas. Você sabe exatamente com quem está falando e quanto vai pagar.',
  },
]

export function AboutPage() {
  return (
    <PageLayout>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 py-16 md:py-24 text-white">
        <div className="page-container text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-300 mb-3">Quem somos</p>
          <h1 className="text-4xl font-extrabold md:text-5xl">Instituto de Apoio à Psicologia<br className="hidden md:block" /> e Saúde Mental</h1>
          <p className="mt-4 text-primary-100 max-w-xl mx-auto text-base leading-relaxed">
            A IAPPM nasceu com a missão de facilitar o acesso à saúde mental de qualidade para todos os brasileiros.
          </p>
        </div>
      </section>

      {/* Missão */}
      <section className="bg-white py-16 md:py-20">
        <div className="page-container max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-600 mb-2">Nossa missão</p>
            <h2 className="text-3xl font-bold text-gray-900">Por que existimos?</h2>
          </div>
          <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed space-y-4">
            <p>
              O Brasil enfrenta uma crise silenciosa de saúde mental. Milhões de brasileiros precisam de apoio psicológico, mas enfrentam barreiras: dificuldade de encontrar profissionais de confiança, falta de informação sobre preços e especialidades, e processos burocráticos que afastam quem mais precisa de ajuda.
            </p>
            <p>
              A IAPPM foi criada para mudar isso. Somos uma plataforma de credenciamento e busca de psicólogos que conecta pacientes a profissionais verificados, com transparência total sobre preços, especialidades e formas de atendimento.
            </p>
            <p>
              Cada psicólogo na nossa plataforma passou por um processo rigoroso de verificação: CRP conferido junto ao Conselho Federal de Psicologia, documentos analisados pela nossa equipe e termos de uso aceitos. Você encontra profissionais de confiança — sem surpresas.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-gray-50 py-16 md:py-20 border-y border-gray-100">
        <div className="page-container">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-600 mb-2">O que nos guia</p>
            <h2 className="text-3xl font-bold text-gray-900">Nossos valores</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 mb-4">
                  <Icon className="h-5 w-5 text-primary-700" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 md:py-20">
        <div className="page-container text-center">
          <h2 className="text-3xl font-bold text-gray-900">Faça parte da IAPPM</h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            Seja como paciente buscando apoio, ou como psicólogo querendo expandir sua atuação.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-primary-700 hover:bg-primary-800 px-8" asChild>
              <Link to="/psicologos">Buscar psicólogos<ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 px-8" asChild>
              <Link to="/credenciar">Sou psicólogo</Link>
            </Button>
          </div>
        </div>
      </section>

    </PageLayout>
  )
}
