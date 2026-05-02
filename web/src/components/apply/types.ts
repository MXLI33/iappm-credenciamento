import { z } from 'zod'
import { validateCpf, validateCrp } from '@/lib/validators'

export const step1Schema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  cpf: z.string().refine((v) => validateCpf(v), 'CPF inválido'),
  whatsapp: z.string().min(10, 'Telefone inválido').max(11, 'Telefone inválido'),
  email: z.string().email('E-mail inválido'),
})

export const step2Schema = z.object({
  crp: z.string().refine((v) => validateCrp(v), 'Formato inválido. Ex: 06/12345'),
  crpState: z.string().min(2, 'Selecione o estado do CRP'),
  graduationYear: z.coerce
    .number()
    .min(1950, 'Ano inválido')
    .max(new Date().getFullYear(), 'Ano inválido')
    .optional()
    .or(z.literal('')),
  specialties: z.array(z.string()).min(1, 'Selecione pelo menos 1 especialidade'),
  approaches: z.array(z.string()).min(1, 'Selecione pelo menos 1 abordagem'),
  ageGroups: z.array(z.string()).min(1, 'Selecione pelo menos 1 público atendido'),
  languages: z.array(z.string()).min(1, 'Selecione pelo menos 1 idioma'),
  modalidade: z.enum(['online', 'presencial', 'ambos']),
  stateId: z.string().optional(),
  cityId: z.string().optional(),
  consultFee: z.coerce.number().min(0).optional().or(z.literal('')),
  bio: z
    .string()
    .min(100, 'Biografia deve ter pelo menos 100 caracteres')
    .max(1000, 'Biografia deve ter no máximo 1000 caracteres')
    .optional()
    .or(z.literal('')),
})

export const step3Schema = z.object({
  photo: z.instanceof(File, { message: 'Foto de perfil obrigatória' }).optional(),
  diploma: z.instanceof(File, { message: 'Diploma obrigatório' }).optional(),
  crpCard: z.instanceof(File, { message: 'Carteira do CRP obrigatória' }).optional(),
  idDoc: z.instanceof(File, { message: 'Documento de identidade obrigatório' }).optional(),
  termsAccepted: z.literal(true, { errorMap: () => ({ message: 'Você deve aceitar os termos' }) }),
})

export const applicationSchema = step1Schema.merge(step2Schema).merge(step3Schema)

export type ApplicationFormData = z.infer<typeof applicationSchema>
