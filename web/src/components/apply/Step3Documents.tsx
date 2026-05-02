import { useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Upload, X, FileText, Image } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { ApplicationFormData } from './types'

interface FileField {
  key: keyof Pick<ApplicationFormData, 'photo' | 'diploma' | 'crpCard' | 'idDoc'>
  label: string
  required: boolean
  accept: string
  hint: string
}

const fields: FileField[] = [
  {
    key: 'photo',
    label: 'Foto de perfil',
    required: true,
    accept: 'image/jpeg,image/png',
    hint: 'JPG ou PNG, máx. 5 MB',
  },
  {
    key: 'diploma',
    label: 'Diploma de graduação',
    required: true,
    accept: 'image/jpeg,image/png,application/pdf',
    hint: 'JPG, PNG ou PDF, máx. 5 MB',
  },
  {
    key: 'crpCard',
    label: 'Carteira do CRP',
    required: true,
    accept: 'image/jpeg,image/png,application/pdf',
    hint: 'JPG, PNG ou PDF, máx. 5 MB',
  },
  {
    key: 'idDoc',
    label: 'Documento de identidade (RG ou CNH)',
    required: true,
    accept: 'image/jpeg,image/png,application/pdf',
    hint: 'JPG, PNG ou PDF, máx. 5 MB',
  },
]

const MAX_SIZE = 5 * 1024 * 1024

function FileUpload({
  field,
  value,
  onChange,
  error,
}: {
  field: FileField
  value?: File
  onChange: (file: File | undefined) => void
  error?: string
}) {
  const ref = useRef<HTMLInputElement>(null)
  const [sizeError, setSizeError] = useState<string>()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > MAX_SIZE) {
      setSizeError('Arquivo muito grande. Máximo: 5 MB')
      return
    }
    setSizeError(undefined)
    onChange(file)
  }

  const displayError = sizeError ?? error
  const isImage = value?.type.startsWith('image/')

  return (
    <div className="flex flex-col gap-1.5">
      <Label>
        {field.label}
        {field.required && ' *'}
      </Label>

      {value ? (
        <div className="flex items-center gap-3 rounded-lg border border-primary-200 bg-primary-50 px-4 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100">
            {isImage ? (
              <Image className="h-5 w-5 text-primary-600" />
            ) : (
              <FileText className="h-5 w-5 text-primary-600" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{value.name}</p>
            <p className="text-xs text-muted-foreground">
              {(value.size / 1024).toFixed(0)} KB
            </p>
          </div>
          <button
            type="button"
            onClick={() => { onChange(undefined); if (ref.current) ref.current.value = '' }}
            className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-primary-100 transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className={cn(
            'flex flex-col items-center gap-2 rounded-lg border-2 border-dashed px-4 py-6 text-center transition-colors hover:border-primary hover:bg-primary-50',
            displayError ? 'border-destructive' : 'border-gray-200',
          )}
        >
          <Upload className="h-6 w-6 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-foreground">Clique para enviar</p>
            <p className="text-xs text-muted-foreground">{field.hint}</p>
          </div>
        </button>
      )}

      <input
        ref={ref}
        type="file"
        accept={field.accept}
        className="hidden"
        onChange={handleChange}
      />

      {displayError && <p className="text-xs text-destructive">{displayError}</p>}
    </div>
  )
}

export function Step3Documents() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ApplicationFormData>()

  const termsAccepted = watch('termsAccepted')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Documentos</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Envie os documentos necessários para análise da sua solicitação.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <FileUpload
            key={field.key}
            field={field}
            value={watch(field.key) as File | undefined}
            onChange={(file) => setValue(field.key, file as any, { shouldValidate: true })}
            error={errors[field.key]?.message}
          />
        ))}
      </div>

      {/* Legal notice */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <p className="font-medium mb-1">Aviso importante</p>
        <p>
          Todos os documentos são analisados pela equipe IAPPM com total confidencialidade.
          Seus dados pessoais são protegidos de acordo com a LGPD.
        </p>
      </div>

      {/* Terms */}
      <div
        className={cn(
          'flex items-start gap-3 rounded-lg border p-4',
          errors.termsAccepted ? 'border-destructive bg-destructive/5' : 'border-gray-200 bg-gray-50',
        )}
      >
        <Checkbox
          id="terms"
          checked={!!termsAccepted}
          onCheckedChange={(checked) =>
            setValue('termsAccepted', checked === true ? true : (undefined as any), {
              shouldValidate: true,
            })
          }
          className="mt-0.5"
        />
        <label htmlFor="terms" className="text-sm text-foreground cursor-pointer leading-relaxed">
          Li e aceito os{' '}
          <a href="/termos" target="_blank" className="text-primary underline underline-offset-2">
            Termos de Uso
          </a>{' '}
          e a{' '}
          <a href="/privacidade" target="_blank" className="text-primary underline underline-offset-2">
            Política de Privacidade
          </a>{' '}
          da plataforma IAPPM.
        </label>
      </div>
      {errors.termsAccepted && (
        <p className="text-xs text-destructive">{errors.termsAccepted.message}</p>
      )}
    </div>
  )
}
