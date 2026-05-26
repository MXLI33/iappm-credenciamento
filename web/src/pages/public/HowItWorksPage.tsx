import { Link } from 'react-router-dom'
import { ArrowRight, Search, UserCheck, MessageCircle, FileText, Clock, Shield, Upload, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/common/PageLayout'

const patientSteps = [
  {
    icon: Search,
    step: '01',
    title: 'Busque pelo perfil ideal',
    desc: 'Filtre por especialidade, abordagem terapêutica, faixa etária, idioma, cidade e modalidade de atendimento (online, presencial ou ambos).',
  },
  {
    icon: UserCheck,
    step: '02',
    title: 'Veja o perfil completo',
    desc: 'Acesse a bio, especialidades, abordagens, CRP verificado e valor de consulta. Tudo que você precisa para escolher com confiança.',
  },
  {
    icon: MessageCircle,
    step: '03',
    title: 'Entre em contato pelo WhatsApp',
    desc: 'Com um clique você abre o WhatsApp diretamente com o psicólogo para agendar sua primeira sessão. Sem intermediários.',
  },
]

const psiSteps = [
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
    q: 'O serviço é gratuito para pacientes?',
    a: 'Sim, totalmente gratuito. Você encontra e entra em contato com psicólogos sem nenhum custo pela plataforma.',
  },
  {
    q: 'Como os psicólogos são verificados?',
    a: 'Todos os psicólogos passam por um processo de credenciamento manual. Verificamos o CRP junto ao CFP e analisamos os documentos enviados antes de publicar qualquer perfil.',
  },
  {
    q: 'O credenciamento tem algum custo para o psicólogo?',
    a: 'Não. O credenciamento é 100% gratuito. Não cobramos taxa de adesão nem mensalidade para os perfis básicos.',
  },
  {
    q: 'Quanto tempo leva para meu perfil ser publicado?',
    a: 'O processo de análise leva até 3 dias úteis após o envio de todos os documentos.',
  },
  {
    q: 'Posso atender online e presencialmente?',
    a: 'Sim. Você escolhe a modalidade: somente online, somente presencial ou ambas.',
  },
]

export function HowItWorksPage() {
  return (
    <PageLayout>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 py-16 md:py-24 text-white">
        <div className="page-container text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-300 mb-3">Transparência total</p>
          <h1 className="text-4xl font-extrabold md:text-5xl">Como funciona a IAPPM?</h1>
          <p className="mt-4 text-primary-100 max-w-xl mx-auto text-base leading-relaxed">
            Entenda o processo — tanto para quem busca psicólogo quanto para psicólogos que querem se credenciar.
          </p>
        </div>
      </section>

      {/* Para pacientes */}
      <section className="bg-white py-16 md:py-20">
        <div className="page-container">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px flex-1 bg-gray-100" />
            <span className="rounded-full bg-primary-50 px-4 py-1 text-sm font-semibold text-primary-700">Para quem busca atendimento</span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {patientSteps.map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="relative rounded-2xl border border-gray-100 bg-gray-50 p-7 hover:border-primary-200 hover:bg-primary-50/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100">
                    <Icon className="h-5 w-5 text-primary-700" />
                  </div>
                  <span className="text-3xl font-extrabold text-primary-100 leading-none mt-1">{step}</span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button size="lg" className="bg-primary-700 hover:bg-primary-800 px-8" asChild>
              <Link to="/psicologos">
                Buscar psicólogos agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Para psicólogos */}
      <section className="bg-gray-50 py-16 md:py-20 border-y border-gray-100">
        <div className="page-container">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="rounded-full bg-primary-800 px-4 py-1 text-sm font-semibold text-white">Para psicólogos</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {psiSteps.map(({ icon: Icon, step, title, desc }) => (
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
              <Link to="/credenciar">
                Quero me credenciar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Segurança */}
      <section className="bg-white py-16 md:py-20">
        <div className="page-container">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-600 mb-2">Nossa prioridade</p>
            <h2 className="text-3xl font-bold text-gray-900">Segurança e conformidade</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-3xl mx-auto">
            {[
              { icon: Shield, title: 'CRP verificado', desc: 'Todos os registros são conferidos junto ao Conselho Federal de Psicologia antes da publicação.' },
              { icon: Shield, title: 'LGPD em conformidade', desc: 'CPF nunca armazenado em texto puro. Dados tratados conforme a Lei Geral de Proteção de Dados.' },
              { icon: CheckCircle, title: 'CFP respeitado', desc: 'Relatórios e perfis seguem as normas do CFP. Nenhum conteúdo proibido é permitido na plataforma.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50">
                  <Icon className="h-5 w-5 text-primary-700" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16 md:py-20 border-t border-gray-100">
        <div className="page-container max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-600 mb-2">Dúvidas frequentes</p>
            <h2 className="text-3xl font-bold text-gray-900">Perguntas frequentes</h2>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="rounded-xl bg-white border border-gray-100 p-5 shadow-sm">
                <p className="text-sm font-semibold text-gray-900">{q}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </PageLayout>
  )
}
