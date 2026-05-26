import { useFormContext } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { Check } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getMasterData, getCitiesByState } from '@/services/psychologists'
import type { ApplicationFormData } from './types'
import type { MasterItem } from '@/types'

const UFS = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
  'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
  'RS','RO','RR','SC','SP','SE','TO',
]

function MultiSelect({
  items,
  selected,
  onToggle,
  error,
}: {
  items: MasterItem[]
  selected: string[]
  onToggle: (id: string) => void
  error?: string
}) {
  return (
    <div>
      <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto rounded-lg border border-input bg-white p-2">
        {items.map((item) => {
          const isSelected = selected.includes(item.id)
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onToggle(item.id)}
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors cursor-pointer
                ${isSelected
                  ? 'border-primary bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white text-muted-foreground hover:border-primary-200 hover:text-primary-600'
                }`}
            >
              {isSelected && <Check className="h-3 w-3" />}
              {item.name.split('(')[0].trim()}
            </button>
          )
        })}
      </div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      {selected.length > 0 && (
        <p className="mt-1 text-xs text-primary-600">{selected.length} selecionado(s)</p>
      )}
    </div>
  )
}

export function Step2Professional() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ApplicationFormData>()

  const stateId = watch('stateId')
  const specialties = watch('specialties') ?? []
  const approaches = watch('approaches') ?? []
  const ageGroups = watch('ageGroups') ?? []
  const languages = watch('languages') ?? []
  const bio = watch('bio') ?? ''

  const { data: master } = useQuery({ queryKey: ['master-data'], queryFn: getMasterData })
  const { data: cities } = useQuery({
    queryKey: ['cities', stateId],
    queryFn: () => getCitiesByState(stateId!),
    enabled: !!stateId,
  })

  function toggle(field: 'specialties' | 'approaches' | 'ageGroups' | 'languages', id: string) {
    const current: string[] = watch(field) ?? []
    const next = current.includes(id) ? current.filter((v) => v !== id) : [...current, id]
    setValue(field, next, { shouldValidate: true })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Dados Profissionais</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Informações sobre sua atuação como psicólogo(a).
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* CRP */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="crp">CRP *</Label>
          <Input
            id="crp"
            placeholder="Ex: 06/12345"
            {...register('crp')}
            className={errors.crp ? 'border-destructive' : ''}
          />
          {errors.crp && <p className="text-xs text-destructive">{errors.crp.message}</p>}
        </div>

        {/* CRP State */}
        <div className="flex flex-col gap-1.5">
          <Label>Estado do CRP *</Label>
          <Select
            value={watch('crpState') ?? ''}
            onValueChange={(v) => setValue('crpState', v, { shouldValidate: true })}
          >
            <SelectTrigger className={errors.crpState ? 'border-destructive' : ''}>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {UFS.map((uf) => (
                <SelectItem key={uf} value={uf}>{uf}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.crpState && <p className="text-xs text-destructive">{errors.crpState.message}</p>}
        </div>

        {/* Graduation Year */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="graduationYear">Ano de formação</Label>
          <Input
            id="graduationYear"
            type="number"
            placeholder="Ex: 2015"
            inputMode="numeric"
            {...register('graduationYear')}
          />
        </div>

        {/* Consult Fee */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="consultFee">Valor da consulta (R$)</Label>
          <Input
            id="consultFee"
            type="number"
            placeholder="Ex: 150"
            inputMode="numeric"
            {...register('consultFee')}
          />
        </div>

        {/* Modalidade */}
        <div className="flex flex-col gap-1.5">
          <Label>Modalidade de atendimento *</Label>
          <Select
            value={watch('modalidade') ?? 'ambos'}
            onValueChange={(v) => setValue('modalidade', v as any, { shouldValidate: true })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="presencial">Presencial</SelectItem>
              <SelectItem value="ambos">Online e Presencial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* State */}
        <div className="flex flex-col gap-1.5">
          <Label>Estado de atuação</Label>
          <Select
            value={watch('stateId') ?? 'none'}
            onValueChange={(v) => {
              setValue('stateId', v === 'none' ? undefined : v)
              setValue('cityId', undefined)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              <SelectItem value="none">Nenhum</SelectItem>
              {master?.states.map((s) => (
                <SelectItem key={s.id} value={s.id}>{s.uf} — {s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* City */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label>Cidade</Label>
          <Select
            value={watch('cityId') ?? 'none'}
            onValueChange={(v) => setValue('cityId', v === 'none' ? undefined : v)}
            disabled={!stateId || !cities?.length}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o estado primeiro" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              <SelectItem value="none">Nenhuma</SelectItem>
              {cities?.map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Specialties */}
      <div className="flex flex-col gap-1.5">
        <Label>Especialidades * <span className="text-xs text-muted-foreground">(selecione todas que se aplicam)</span></Label>
        <MultiSelect
          items={master?.specialties ?? []}
          selected={specialties}
          onToggle={(id) => toggle('specialties', id)}
          error={errors.specialties?.message as string}
        />
      </div>

      {/* Approaches */}
      <div className="flex flex-col gap-1.5">
        <Label>Abordagens Terapêuticas * <span className="text-xs text-muted-foreground">(selecione todas que se aplicam)</span></Label>
        <MultiSelect
          items={master?.approaches ?? []}
          selected={approaches}
          onToggle={(id) => toggle('approaches', id)}
          error={errors.approaches?.message as string}
        />
      </div>

      {/* Age Groups */}
      <div className="flex flex-col gap-1.5">
        <Label>Públicos Atendidos *</Label>
        <div className="flex flex-wrap gap-2">
          {master?.ageGroups.map((ag) => {
            const isSelected = ageGroups.includes(ag.id)
            return (
              <button
                key={ag.id}
                type="button"
                onClick={() => toggle('ageGroups', ag.id)}
                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium transition-colors
                  ${isSelected
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-200 bg-white text-muted-foreground hover:border-primary-200'
                  }`}
              >
                {isSelected && <Check className="h-3 w-3" />}
                {ag.name}
              </button>
            )
          })}
        </div>
        {errors.ageGroups && <p className="text-xs text-destructive">{errors.ageGroups.message as string}</p>}
      </div>

      {/* Languages */}
      <div className="flex flex-col gap-1.5">
        <Label>Idiomas *</Label>
        <div className="flex flex-wrap gap-2">
          {master?.languages.map((lang) => {
            const isSelected = languages.includes(lang.id)
            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => toggle('languages', lang.id)}
                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium transition-colors
                  ${isSelected
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-200 bg-white text-muted-foreground hover:border-primary-200'
                  }`}
              >
                {isSelected && <Check className="h-3 w-3" />}
                {lang.name}
              </button>
            )
          })}
        </div>
        {errors.languages && <p className="text-xs text-destructive">{errors.languages.message as string}</p>}
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="bio">
          Biografia
          <span className="ml-1 text-xs text-muted-foreground">(100–1000 caracteres)</span>
        </Label>
        <textarea
          id="bio"
          {...register('bio')}
          rows={5}
          placeholder="Fale sobre sua experiência, abordagem e como você pode ajudar seus pacientes..."
          className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
        <div className="flex items-center justify-between">
          {errors.bio
            ? <p className="text-xs text-destructive">{errors.bio.message}</p>
            : <span />
          }
          <p className="text-xs text-muted-foreground">{bio.length}/1000</p>
        </div>
      </div>
    </div>
  )
}
