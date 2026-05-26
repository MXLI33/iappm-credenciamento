import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/common/PageLayout'

const faqs = [
  {
    category: 'Para pacientes',
    items: [
      {
        q: 'O serviço é gratuito para pacientes?',
        a: 'Sim, totalmente gratuito. Você encontra e entra em contato com psicólogos sem nenhum custo pela plataforma. O pagamento da consulta é combinado diretamente com o psicólogo.',
      },
      {
        q: 'Como os psicólogos são verificados?',
        a: 'Todos os psicólogos passam por um processo de credenciamento manual. Verificamos o CRP junto ao Conselho Federal de Psicologia (CFP) e analisamos os documentos enviados antes de publicar qualquer perfil.',
      },
      {
        q: 'Como entro em contato com um psicólogo?',
        a: 'Ao clicar em "Falar no WhatsApp" no perfil do psicólogo, você é direcionado diretamente para uma conversa no WhatsApp com o profissional. Não há intermediários.',
      },
      {
        q: 'Posso filtrar por modalidade de atendimento?',
        a: 'Sim. Você pode filtrar por atendimento online, presencial ou ambos. Também é possível filtrar por especialidade, abordagem terapêutica, público atendido, idioma, estado e cidade.',
      },
      {
        q: 'As consultas são realizadas pela plataforma?',
        a: 'Não. A IAPPM é um diretório de busca. As consultas são agendadas e realizadas diretamente entre você e o psicólogo, fora da plataforma.',
      },
    ],
  },
  {
    category: 'Para psicólogos',
    items: [
      {
        q: 'O credenciamento tem algum custo?',
        a: 'Não. O credenciamento é 100% gratuito. Não cobramos taxa de adesão nem mensalidade para os perfis básicos.',
      },
      {
        q: 'Quanto tempo leva para meu perfil ser publicado?',
        a: 'O processo de análise leva até 3 dias úteis após o envio de todos os documentos e informações.',
      },
      {
        q: 'Quais documentos são necessários para o credenciamento?',
        a: 'Foto de perfil (JPG/PNG, máx. 5 MB), diploma de graduação, carteira do CRP e documento de identidade (RG ou CNH).',
      },
      {
        q: 'Posso atender online e presencialmente ao mesmo tempo?',
        a: 'Sim. Você escolhe a modalidade no momento do cadastro: somente online, somente presencial ou ambas.',
      },
      {
        q: 'Como editar meu perfil após a aprovação?',
        a: 'Após a aprovação, você recebe suas credenciais de acesso por e-mail. Com elas, você acessa seu painel e pode editar bio, especialidades, valor da consulta, foto e outros dados a qualquer momento.',
      },
      {
        q: 'Meu CPF fica armazenado na plataforma?',
        a: 'Seu CPF nunca é armazenado em texto puro. Utilizamos hash SHA-256, em conformidade com a LGPD. O CPF é usado apenas para verificar duplicidade no momento do cadastro.',
      },
    ],
  },
  {
    category: 'Segurança e privacidade',
    items: [
      {
        q: 'Como meus dados são protegidos?',
        a: 'Seguimos a Lei Geral de Proteção de Dados (LGPD). CPFs são armazenados como hash, documentos são armazenados com segurança e nomes de arquivos são aleatorizados.',
      },
      {
        q: 'Quem pode ver meu perfil público?',
        a: 'Qualquer pessoa pode ver seu perfil público na busca. Apenas você e a equipe IAPPM têm acesso aos seus documentos de credenciamento.',
      },
    ],
  },
]

export function FaqPage() {
  return (
    <PageLayout>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 py-16 md:py-20 text-white">
        <div className="page-container text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-300 mb-3">Dúvidas frequentes</p>
          <h1 className="text-4xl font-extrabold md:text-5xl">Perguntas Frequentes</h1>
          <p className="mt-4 text-primary-100 max-w-xl mx-auto text-base leading-relaxed">
            Encontre respostas para as dúvidas mais comuns sobre a plataforma.
          </p>
        </div>
      </section>

      {/* FAQ sections */}
      <section className="bg-white py-16 md:py-20">
        <div className="page-container max-w-3xl mx-auto space-y-12">
          {faqs.map(({ category, items }) => (
            <div key={category}>
              <h2 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">{category}</h2>
              <div className="flex flex-col gap-4">
                {items.map(({ q, a }) => (
                  <div key={q} className="rounded-xl bg-gray-50 border border-gray-100 p-5">
                    <p className="text-sm font-semibold text-gray-900 mb-2">{q}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions? */}
      <section className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="page-container text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Ainda tem dúvidas?</h2>
          <p className="text-sm text-muted-foreground mb-6">Nossa equipe está pronta para te ajudar.</p>
          <Button size="lg" className="bg-primary-700 hover:bg-primary-800 px-8" asChild>
            <Link to="/contato">Fale conosco <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

    </PageLayout>
  )
}
