import { PageLayout } from '@/components/common/PageLayout'

export function TermsPage() {
  return (
    <PageLayout>

      <section className="bg-gradient-to-br from-primary-900 to-primary-700 py-12 md:py-16 text-white">
        <div className="page-container">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-300 mb-2">Versão 1.0 — Maio 2026</p>
          <h1 className="text-3xl font-extrabold md:text-4xl">Termos de Uso</h1>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="page-container max-w-3xl mx-auto prose prose-sm prose-gray max-w-none">

          <h2>1. Aceitação dos Termos</h2>
          <p>
            Ao acessar e utilizar a plataforma IAPPM (Instituto de Apoio à Psicologia e Saúde Mental), você concorda com estes Termos de Uso. Caso não concorde com qualquer disposição, não utilize os serviços da plataforma.
          </p>

          <h2>2. Descrição do Serviço</h2>
          <p>
            A IAPPM é um diretório de busca de psicólogos credenciados. A plataforma conecta pacientes a profissionais de saúde mental verificados, facilitando o contato inicial. A IAPPM não realiza consultas, não intermedia pagamentos e não é parte da relação terapêutica entre paciente e psicólogo.
          </p>

          <h2>3. Cadastro de Psicólogos</h2>
          <p>
            Para ser listado na plataforma, o psicólogo deve:
          </p>
          <ul>
            <li>Possuir registro ativo no Conselho Regional de Psicologia (CRP);</li>
            <li>Enviar os documentos solicitados no processo de credenciamento;</li>
            <li>Fornecer informações verdadeiras e atualizadas;</li>
            <li>Cumprir as normas do Conselho Federal de Psicologia (CFP).</li>
          </ul>
          <p>
            A IAPPM reserva-se o direito de aprovar, rejeitar ou remover qualquer perfil que não atenda aos critérios estabelecidos.
          </p>

          <h2>4. Uso da Plataforma por Pacientes</h2>
          <p>
            O acesso à busca de psicólogos é gratuito e não requer cadastro. O usuário é responsável por verificar as informações do profissional antes de iniciar qualquer relação terapêutica. A IAPPM não se responsabiliza pela qualidade dos atendimentos realizados.
          </p>

          <h2>5. Limitação de Responsabilidade</h2>
          <p>
            A IAPPM não garante a disponibilidade contínua dos serviços e não se responsabiliza por danos decorrentes do uso ou impossibilidade de uso da plataforma. As informações dos perfis são de responsabilidade dos próprios profissionais cadastrados.
          </p>

          <h2>6. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo da plataforma — logotipo, textos, interface — é de propriedade da IAPPM. É proibida a reprodução ou uso comercial sem autorização expressa.
          </p>

          <h2>7. Privacidade</h2>
          <p>
            O tratamento de dados pessoais é regido pela nossa Política de Privacidade, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018).
          </p>

          <h2>8. Alterações nos Termos</h2>
          <p>
            A IAPPM pode atualizar estes Termos a qualquer momento. Alterações relevantes serão comunicadas por e-mail aos psicólogos cadastrados. O uso continuado da plataforma após a publicação das alterações implica aceitação dos novos termos.
          </p>

          <h2>9. Contato</h2>
          <p>
            Dúvidas sobre estes Termos: <a href="mailto:contato@iappm.com.br">contato@iappm.com.br</a>
          </p>

          <div className="mt-8 rounded-xl border border-gray-100 bg-gray-50 p-4 text-xs text-muted-foreground">
            <p className="font-semibold text-gray-700 mb-1">Aviso de saúde mental</p>
            <p>
              Este serviço não substitui urgência ou emergência psiquiátrica. Em caso de crise, ligue <strong>188</strong> (CVV — Centro de Valorização da Vida) ou <strong>192</strong> (SAMU).
            </p>
          </div>

        </div>
      </section>

    </PageLayout>
  )
}
