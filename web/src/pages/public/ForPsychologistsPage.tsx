import { Link } from 'react-router-dom'
import { ArrowRight, Globe, Calendar, CreditCard, TrendingUp, FileText, Upload, Clock, CheckCircle, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/common/PageLayout'

const benefits = [
  {
    icon: Globe,
    title: 'Alcance nacional',
    desc: 'Seu perfil é visível para pacientes em todo o Brasil. Atenda online ou presencialmente, conforme sua preferência.',
  },
  {
    icon: TrendingUp,
    title: 'Mais visibilidade',
    desc: 'Perfil otimizado com especialidades, abordagens e foto profissional para que pacientes encontrem você com facilidade.',
  },
  {
    icon: CreditCard,
    title: 'Sem intermediários',
    desc: 'Receba diretamente do paciente. A IAPPM não cobra comissão sobre consultas realizadas.',
  },
  {
    icon: Calendar,
    title: 'Agenda própria',
    desc: 'Você define seus horários, valores e formas de atendimento. Total autonomia profissional.',
  },
  {
    icon: Shield,
    title: 'CRP verificado',
    desc: 'Seu registro é conferido junto ao CFP, conferindo credibilidade e confiança ao seu perfil.',
  },
  {
    icon: FileText,
    title: 'Perfil completo',
    desc: 'Bio, especialidades, abordagens, público atendido, idiomas, valor de consulta e foto — tudo em um só lugar.',
  },
]

const steps = [
  {
    icon: FileText,
    step: '01',
    title: 'Preencha o formulário',
    desc: 'Informe seus dados pessoais, profissionais (CRP, especialidades, abordagens) e o valor de consulta. Leva menos de 10 minutos.',
  },
  {
    icon: Upload,
    step: '02',
    title: 'Envie seus documentos',
    desc: 'Foto de perfil, diploma, carteira do CRP e documento de identidade. Todos os arquivos são armazenados com segurança.',
  },
  {
    icon: Clock,
    step: '03',
    title: 'Aguarde a análise',
    desc: 'Nossa equipe revisa sua solicitação em até 3 dias úteis, verificando a autenticidade do CRP junto ao CFP.',
  },
  {
    icon: CheckCircle,
    step: '04',
    title: 'Perfil publicado',
    desc: 'Após aprovação, seu perfil é publicado automaticamente e você recebe suas credenciais de acesso por e-mail.',
  },
]

const faqs = [
  {
    q: 'O credenciamento tem algum custo?',
    a: 'Não. O credenciamento é 100% gratuito. Não cobramos taxa de adesão nem mensalidade.',
  },
  {
    q: 'Quais documentos são necessários?',
    a: 'Foto de perfil, diploma de graduação, carteira do CRP e documento de identidade (RG ou CNH).',
  },
  {
    q: 'Posso editar meu perfil depois da aprovação?',
    a: 'Sim. Após a aprovação você recebe acesso ao painel do psicólogo, onde pode editar bio, especialidades, valor e foto a qualquer momento.',
  },
  {
    q: 'Meu CRP precisa estar ativo?',
    a: 'Sim. Verificamos a situação do CRP junto ao CFP no momento da análise. CRPs inativos ou com restrições não são aprovados.',
  },
]

export function ForPsychologistsPage() {
  return (
    <PageLayout>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 py-16 md:py-24 text-white">
        <div className="page-container text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-300 mb-3">Para psicólogos</p>
          <h1 className="text-4xl font-extrabold md:text-5xl leading-tight">
            Expanda sua atuação.<br className="hidden md:block" />
            Conquiste mais pacientes.
          </h1>
          <p className="mt-5 text-primary-100 max-w-xl mx-auto text-base leading-relaxed">
            Crie seu perfil na IAPPM, alcance pacientes em todo o Brasil e atenda com total autonomia. Gratuito e sem comissões.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-white text-primary-800 hover:bg-primary-50 font-semibold px-8" asChild>
              <Link to="/credenciar">Quero me credenciar <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 px-8" asChild>
              <Link to="/como-funciona">Como funciona</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-16 md:py-20">
        <div className="page-container">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-600 mb-2">Por que a IAPPM?</p>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Benefícios do credenciamento</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 hover:border-primary-200 hover:bg-primary-50/30 transition-colors">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100 mb-4">
                  <Icon className="h-5 w-5 text-primary-700" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="bg-gray-50 py-16 md:py-20 border-y border-gray-100">
        <div className="page-container">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-600 mb-2">Simples e rápido</p>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Como se credenciar</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-700 mb-4">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <p className="text-xs font-bold text-primary-400 tracking-widest mb-1">PASSO {step}</p>
                <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button size="lg" className="bg-primary-700 hover:bg-primary-800 px-8" asChild>
              <Link to="/credenciar">Iniciar credenciamento <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 md:py-20">
        <div className="page-container max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-600 mb-2">Dúvidas</p>
            <h2 className="text-3xl font-bold text-gray-900">Perguntas frequentes</h2>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="rounded-xl bg-gray-50 border border-gray-100 p-5">
                <p className="text-sm font-semibold text-gray-900 mb-2">{q}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/faq" className="text-sm font-medium text-primary-700 hover:underline inline-flex items-center gap-1">
              Ver todas as perguntas frequentes <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

    </PageLayout>
  )
}
