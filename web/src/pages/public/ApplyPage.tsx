import { useState } from 'react'
import { useForm, FormProvider, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/common/Logo'
import { StepIndicator } from '@/components/apply/StepIndicator'
import { Step1Personal } from '@/components/apply/Step1Personal'
import { Step2Professional } from '@/components/apply/Step2Professional'
import { Step3Documents } from '@/components/apply/Step3Documents'
import { SuccessScreen } from '@/components/apply/SuccessScreen'
import { applicationSchema, step1Schema, step2Schema } from '@/components/apply/types'
import type { ApplicationFormData } from '@/components/apply/types'
import { api } from '@/lib/api'

const STEPS = [
  { label: 'Dados Pessoais', description: 'Nome, CPF, contato' },
  { label: 'Dados Profissionais', description: 'CRP, especialidades' },
  { label: 'Documentos', description: 'Upload e termos' },
]

const stepSchemas = [step1Schema, step2Schema]

export function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ protocol: string; email: string } | null>(null)
  const [submitError, setSubmitError] = useState<string>()

  const methods = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema) as Resolver<ApplicationFormData>,
    defaultValues: {
      modalidade: 'ambos',
      specialties: [],
      approaches: [],
      ageGroups: [],
      languages: [],
    },
    mode: 'onTouched',
  })

  async function handleNext() {
    const schema = stepSchemas[currentStep - 1]
    if (!schema) {
      setCurrentStep((s) => s + 1)
      return
    }

    const values = methods.getValues()
    const result = schema.safeParse(values)

    if (!result.success) {
      const fields = Object.keys(result.error.flatten().fieldErrors)
      fields.forEach((field) =>
        methods.trigger(field as keyof ApplicationFormData)
      )
      return
    }

    setCurrentStep((s) => s + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleBack() {
    setCurrentStep((s) => s - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function onSubmit(data: ApplicationFormData) {
    setIsSubmitting(true)
    setSubmitError(undefined)

    try {
      const formData = new FormData()

      formData.append('name', data.name)
      formData.append('cpf', data.cpf)
      formData.append('whatsapp', data.whatsapp)
      formData.append('email', data.email)
      formData.append('crp', data.crp)
      formData.append('crpState', data.crpState)
      formData.append('modalidade', data.modalidade)
      formData.append('termsAccepted', 'true')

      if (data.graduationYear) formData.append('graduationYear', String(data.graduationYear))
      if (data.consultFee) formData.append('consultFee', String(data.consultFee))
      if (data.bio) formData.append('bio', data.bio)
      if (data.stateId) formData.append('stateId', data.stateId)
      if (data.cityId) formData.append('cityId', data.cityId)

      data.specialties.forEach((id) => formData.append('specialties[]', id))
      data.approaches.forEach((id) => formData.append('approaches[]', id))
      data.ageGroups.forEach((id) => formData.append('ageGroups[]', id))
      data.languages.forEach((id) => formData.append('languages[]', id))

      if (data.photo instanceof File) formData.append('photo', data.photo)
      if (data.diploma instanceof File) formData.append('diploma', data.diploma)
      if (data.crpCard instanceof File) formData.append('crpCard', data.crpCard)
      if (data.idDoc instanceof File) formData.append('idDoc', data.idDoc)

      const res = await api.post('/credenciamento/applications', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setResult({ protocol: res.data.protocol, email: data.email })
    } catch (err: any) {
      const msg = err?.response?.data?.message
      setSubmitError(Array.isArray(msg) ? msg.join(', ') : (msg ?? 'Erro ao enviar solicitação. Tente novamente.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (result) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
          <SuccessScreen protocol={result.protocol} email={result.email} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="page-container flex h-16 items-center justify-between">
          <Logo size="md" />
          <p className="text-sm text-muted-foreground font-medium hidden sm:block">Credenciamento de Psicólogos</p>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {/* Step indicator */}
          <div className="mb-8 rounded-xl bg-white p-5 shadow-sm border border-gray-100">
            <StepIndicator steps={STEPS} currentStep={currentStep} />
          </div>

          {/* Form card */}
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                {currentStep === 1 && <Step1Personal />}
                {currentStep === 2 && <Step2Professional />}
                {currentStep === 3 && <Step3Documents />}

                {submitError && (
                  <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {submitError}
                  </div>
                )}

                {/* Navigation */}
                <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
                  {currentStep > 1 ? (
                    <Button type="button" variant="outline" onClick={handleBack}>
                      Voltar
                    </Button>
                  ) : (
                    <Button type="button" variant="ghost" asChild>
                      <Link to="/">Cancelar</Link>
                    </Button>
                  )}

                  {currentStep < 3 ? (
                    <Button type="button" onClick={handleNext}>
                      Continuar
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {isSubmitting ? 'Enviando...' : 'Enviar solicitação'}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </FormProvider>

          {/* Step counter */}
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Passo {currentStep} de {STEPS.length}
          </p>
        </div>
      </main>
    </div>
  )
}
