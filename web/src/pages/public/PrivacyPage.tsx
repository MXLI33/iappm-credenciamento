import { PageLayout } from '@/components/common/PageLayout'

export function PrivacyPage() {
  return (
    <PageLayout>

      <section className="bg-gradient-to-br from-primary-900 to-primary-700 py-12 md:py-16 text-white">
        <div className="page-container">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-300 mb-2">Versão 1.0 — Maio 2026</p>
          <h1 className="text-3xl font-extrabold md:text-4xl">Política de Privacidade</h1>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="page-container max-w-3xl mx-auto prose prose-sm prose-gray max-w-none">

          <h2>1. Controlador de Dados</h2>
          <p>
            O tratamento de dados pessoais nesta plataforma é realizado pelo Instituto de Apoio à Psicologia e Saúde Mental (IAPPM). Para dúvidas, entre em contato: <a href="mailto:contato@iappm.com.br">contato@iappm.com.br</a>
          </p>

          <h2>2. Dados Coletados</h2>
          <p><strong>Psicólogos (processo de credenciamento):</strong></p>
          <ul>
            <li>Nome completo, e-mail, WhatsApp;</li>
            <li>CPF (armazenado apenas como hash SHA-256 — nunca em texto puro);</li>
            <li>CRP e estado do CRP;</li>
            <li>Documentos enviados (diploma, carteira do CRP, documento de identidade, foto de perfil);</li>
            <li>Informações profissionais (bio, especialidades, valor de consulta, modalidade).</li>
          </ul>
          <p><strong>Visitantes (pacientes):</strong></p>
          <ul>
            <li>A plataforma de busca não requer cadastro nem coleta dados pessoais de visitantes;</li>
            <li>Podem ser coletados dados de navegação anonimizados para análise de uso.</li>
          </ul>

          <h2>3. Finalidade do Tratamento</h2>
          <ul>
            <li>Verificar a autenticidade do CRP junto ao CFP;</li>
            <li>Publicar o perfil público do psicólogo aprovado;</li>
            <li>Enviar comunicações relacionadas ao credenciamento (aprovação, rejeição, credenciais);</li>
            <li>Prevenir fraudes e duplicidade de cadastros.</li>
          </ul>

          <h2>4. Compartilhamento de Dados</h2>
          <p>
            Não vendemos dados pessoais. Dados podem ser compartilhados com:
          </p>
          <ul>
            <li>Prestadores de serviço de e-mail transacional (Resend), exclusivamente para envio de notificações;</li>
            <li>Autoridades competentes, quando exigido por lei.</li>
          </ul>

          <h2>5. Armazenamento e Segurança</h2>
          <p>
            CPFs são armazenados exclusivamente como hash irreversível. Documentos são armazenados com nomes aleatorizados. Todos os dados são tratados com medidas técnicas e organizacionais adequadas para prevenir acesso não autorizado.
          </p>

          <h2>6. Retenção de Dados</h2>
          <p>
            Dados de solicitações rejeitadas são mantidos por 90 dias após a rejeição. Dados de psicólogos aprovados são mantidos enquanto o perfil estiver ativo. O psicólogo pode solicitar a exclusão do seu perfil e dados a qualquer momento.
          </p>

          <h2>7. Direitos do Titular</h2>
          <p>Em conformidade com a LGPD (Lei 13.709/2018), você tem direito a:</p>
          <ul>
            <li>Confirmar a existência de tratamento de seus dados;</li>
            <li>Acessar seus dados;</li>
            <li>Corrigir dados incompletos ou inexatos;</li>
            <li>Solicitar a anonimização ou exclusão de dados desnecessários;</li>
            <li>Revogar o consentimento.</li>
          </ul>
          <p>Para exercer seus direitos, entre em contato: <a href="mailto:contato@iappm.com.br">contato@iappm.com.br</a></p>

          <h2>8. Cookies</h2>
          <p>
            A plataforma pode utilizar cookies essenciais para funcionamento (autenticação) e cookies analíticos anonimizados. Cookies de publicidade e rastreamento de terceiros não são utilizados.
          </p>

          <h2>9. Alterações nesta Política</h2>
          <p>
            Esta política pode ser atualizada periodicamente. A versão mais recente estará sempre disponível nesta página.
          </p>

        </div>
      </section>

    </PageLayout>
  )
}
