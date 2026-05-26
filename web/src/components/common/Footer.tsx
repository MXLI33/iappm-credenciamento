import { Link } from 'react-router-dom'
import { Logo } from './Logo'

const links = {
  plataforma: [
    { label: 'Buscar psicólogos', href: '/psicologos' },
    { label: 'Como funciona', href: '/como-funciona' },
    { label: 'Credenciar-se', href: '/credenciar' },
  ],
  para_psis: [
    { label: 'Área do psicólogo', href: '/entrar' },
    { label: 'Criar perfil', href: '/credenciar' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="page-container py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">

          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <Logo size="md" asLink={false} />
            <p className="mt-3 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Conectando pessoas a psicólogos credenciados com segurança, qualidade e cuidado.
            </p>
            <p className="mt-4 text-xs text-muted-foreground/70">
              ⚠️ Em caso de crise: <strong>188</strong> (CVV) · <strong>192</strong> (SAMU)
            </p>
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

        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100 pt-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} IAPPM — Instituto de Apoio à Psicologia e Saúde Mental. Todos os direitos reservados.</p>
          <p>CNPJ em breve</p>
        </div>
      </div>
    </footer>
  )
}
