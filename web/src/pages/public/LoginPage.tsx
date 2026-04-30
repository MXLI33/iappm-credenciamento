import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <Link to="/" className="mb-8 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
          <span className="text-sm font-bold text-white">IA</span>
        </div>
        <span className="text-lg font-bold text-primary-800">IAPPM</span>
      </Link>

      <Card className="w-full max-w-sm shadow-sm">
        <CardHeader className="text-center">
          <CardTitle>Entrar na plataforma</CardTitle>
          <CardDescription>Use seu e-mail e senha cadastrados</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" placeholder="seu@email.com" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <Button className="w-full mt-1">Entrar</Button>
          <p className="text-center text-xs text-muted-foreground">
            Não tem conta?{' '}
            <Link to="/credenciar" className="text-primary hover:underline">
              Credenciar-se
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
