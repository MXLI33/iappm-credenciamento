import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step {
  label: string
  description: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNum = index + 1
          const isCompleted = stepNum < currentStep
          const isActive = stepNum === currentStep

          return (
            <div key={step.label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors',
                    isCompleted && 'border-primary bg-primary text-white',
                    isActive && 'border-primary bg-white text-primary',
                    !isCompleted && !isActive && 'border-gray-200 bg-white text-gray-400',
                  )}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : stepNum}
                </div>
                <div className="text-center hidden sm:block">
                  <p className={cn('text-xs font-medium', isActive ? 'text-primary' : isCompleted ? 'text-primary-600' : 'text-gray-400')}>
                    {step.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{step.description}</p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'mx-2 h-0.5 flex-1 transition-colors',
                    stepNum < currentStep ? 'bg-primary' : 'bg-gray-200',
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
