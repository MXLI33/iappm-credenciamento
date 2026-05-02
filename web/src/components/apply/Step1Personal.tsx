import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatCpf, formatPhone } from '@/lib/validators'
import type { ApplicationFormData } from './types'

export function Step1Personal() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ApplicationFormData>()

  const cpf = watch('cpf') ?? ''
  const phone = watch('whatsapp') ?? ''

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Dados Pessoais</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Preencha seus dados pessoais. Seu CPF nunca será compartilhado.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <Label htmlFor="name">Nome completo *</Label>
          <Input
            id="name"
            placeholder="Seu nome completo"
            {...register('name')}
            className={errors.name ? 'border-destructive' : ''}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="cpf">CPF *</Label>
          <Input
            id="cpf"
            placeholder="000.000.000-00"
            value={formatCpf(cpf)}
            onChange={(e) => setValue('cpf', e.target.value.replace(/\D/g, ''), { shouldValidate: true })}
            inputMode="numeric"
            className={errors.cpf ? 'border-destructive' : ''}
          />
          {errors.cpf && <p className="text-xs text-destructive">{errors.cpf.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="whatsapp">WhatsApp / Telefone *</Label>
          <Input
            id="whatsapp"
            placeholder="(00) 00000-0000"
            value={formatPhone(phone)}
            onChange={(e) => setValue('whatsapp', e.target.value.replace(/\D/g, ''), { shouldValidate: true })}
            inputMode="numeric"
            className={errors.whatsapp ? 'border-destructive' : ''}
          />
          {errors.whatsapp && <p className="text-xs text-destructive">{errors.whatsapp.message}</p>}
        </div>

        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            {...register('email')}
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
      </div>
    </div>
  )
}
