import { Link } from 'react-router-dom'

const footerLinks = {
  plataforma: [
    { label: 'Buscar psicólogos', href: '/psicologos' },
    { label: 'Como funciona', href: '/como-funciona' },
    { label: 'Credenciar-se', href: '/credenciar' },
  ],
  suporte: [
    { label: 'Contato', href: '/contato' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Política de privacidade', href: '/privacidade' },
  ],
  para_psis: [
    { label: 'Área do psicólogo', href: '/psicologo/dashboard' },
    { label: 'Criar perfil', href: '/credenciar' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="page-container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-white">IA</span>
              </div>
              <span className="font-bold text-primary-800">IAPPM</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Conectando pessoas a psicólogos credenciados com segurança e cuidado.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Plataforma</h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.plataforma.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Suporte</h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.suporte.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Para psicólogos</h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.para_psis.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} IAPPM — Instituto de Apoio à Psicologia e Saúde Mental. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
