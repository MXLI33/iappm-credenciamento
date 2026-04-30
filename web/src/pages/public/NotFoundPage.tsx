import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/common/PageLayout'

export function NotFoundPage() {
  return (
    <PageLayout>
      <div className="flex flex-1 flex-col items-center justify-center py-24 text-center">
        <p className="text-7xl font-bold text-primary">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-foreground">Página não encontrada</h1>
        <p className="mt-2 text-muted-foreground">
          O endereço que você acessou não existe ou foi movido.
        </p>
        <Button className="mt-8" asChild>
          <Link to="/">Voltar ao início</Link>
        </Button>
      </div>
    </PageLayout>
  )
}
