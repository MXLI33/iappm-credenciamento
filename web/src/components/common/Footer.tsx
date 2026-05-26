import { Link } from 'react-router-dom'
import { Logo } from './Logo'

const links = {
  plataforma: [
    { label: 'Buscar psicólogos', href: '/psicologos' },
    { label: 'Como funciona', href: '/como-funciona' },
    { label: 'Sobre nós', href: '/sobre' },
    { label: 'Perguntas frequentes', href: '/faq' },
  ],
  para_psis: [
    { label: 'Sou psicólogo', href: '/sou-psicologo' },
    { label: 'Credenciar-se', href: '/credenciar' },
    { label: 'Área do psicólogo', href: '/entrar' },
  ],
  legal: [
    { label: 'Termos de Uso', href: '/termos' },
    { label: 'Política de Privacidade', href: '/privacidade' },
    { label: 'Contato', href: '/contato' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="page-container py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Logo size="md" asLink={false} />
            <p className="mt-3 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Conectando pessoas a psicólogos credenciados com segurança, qualidade e cuidado.
            </p>
            <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
              <p>
                <a href="mailto:contato@iappm.com.br" className="hover:text-primary-700 transition-colors">
                  contato@iappm.com.br
                </a>
              </p>
              <p>
                <a href="https://wa.me/5535999212891" target="_blank" rel="noopener noreferrer" className="hover:text-primary-700 transition-colors">
                  (35) 99921-2891
                </a>
              </p>
              <p className="text-muted-foreground/60 mt-3">
                Em caso de crise: <strong className="text-muted-foreground">188</strong> (CVV) · <strong className="text-muted-foreground">192</strong> (SAMU)
              </p>
            </div>
          </div>

          {/* Plataforma */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-900">Plataforma</h4>
            <ul className="flex flex-col gap-2.5">
              {links.plataforma.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary-700">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Para psicólogos */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-900">Para psicólogos</h4>
            <ul className="flex flex-col gap-2.5">
              {links.para_psis.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary-700">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-900">Legal</h4>
            <ul className="flex flex-col gap-2.5">
              {links.legal.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary-700">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100 pt-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} IAPPM — Instituto de Apoio à Psicologia e Saúde Mental. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <Link to="/termos" className="hover:text-primary-700 transition-colors">Termos</Link>
            <Link to="/privacidade" className="hover:text-primary-700 transition-colors">Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
