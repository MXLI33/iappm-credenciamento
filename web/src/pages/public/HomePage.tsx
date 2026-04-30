import { Link } from 'react-router-dom'
import { Search, ShieldCheck, Star, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { PageLayout } from '@/components/common/PageLayout'

const specialties = [
  'Ansiedade', 'Depressão', 'Terapia Cognitivo-Comportamental',
  'Traumas', 'Relacionamentos', 'Infantil', 'Casal', 'Burnout',
]

const stats = [
  { icon: Users, value: '280+', label: 'Psicólogos credenciados' },
  { icon: ShieldCheck, value: '100%', label: 'CRP verificado' },
  { icon: Star, value: '4.9', label: 'Avaliação média' },
]

export function HomePage() {
  return (
    <PageLayout>
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20 md:py-28">
        <div className="page-container text-center">
          <Badge className="mb-4 bg-primary-100 text-primary-800 hover:bg-primary-100">
            Plataforma oficial IAPPM
          </Badge>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Encontre o psicólogo{' '}
            <span className="text-primary">certo para você</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Psicólogos credenciados, verificados e prontos para atender. Busque por especialidade,
            cidade ou plano de saúde.
          </p>

          <div className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Especialidade, nome ou cidade..."
                className="pl-9 h-11"
              />
            </div>
            <Button size="lg" className="shrink-0" asChild>
              <Link to="/psicologos">Buscar psicólogos</Link>
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {specialties.map((s) => (
              <Link key={s} to={`/psicologos?especialidade=${encodeURIComponent(s)}`}>
                <Badge
                  variant="outline"
                  className="cursor-pointer border-primary-200 text-primary-700 hover:bg-primary-50"
                >
                  {s}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-white">
        <div className="page-container">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="page-container text-center">
          <h2 className="text-3xl font-bold text-foreground">Como funciona?</h2>
          <p className="mt-3 text-muted-foreground">Em três passos simples</p>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { step: '1', title: 'Busque', desc: 'Filtre por especialidade, cidade ou plano de saúde.' },
              { step: '2', title: 'Escolha', desc: 'Veja perfis detalhados, avaliações e formas de contato.' },
              { step: '3', title: 'Conecte', desc: 'Entre em contato diretamente via WhatsApp ou e-mail.' },
            ].map(({ step, title, desc }) => (
              <Card key={step} className="text-left shadow-sm">
                <CardContent className="pt-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {step}
                  </div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button className="mt-10" size="lg" asChild>
            <Link to="/como-funciona">Saiba mais</Link>
          </Button>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="page-container text-center">
          <h2 className="text-3xl font-bold">Você é psicólogo?</h2>
          <p className="mt-3 text-primary-100">
            Credenciamento gratuito. Mostre seu trabalho para milhares de pacientes.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="mt-8 border-white text-white hover:bg-white hover:text-primary"
            asChild
          >
            <Link to="/credenciar">Quero me credenciar</Link>
          </Button>
        </div>
      </section>
    </PageLayout>
  )
}
