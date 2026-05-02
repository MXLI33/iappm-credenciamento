export function validateCpf(cpf: string): boolean {
  const clean = cpf.replace(/\D/g, '')
  if (clean.length !== 11 || /^(\d)\1+$/.test(clean)) return false

  const calc = (digits: string, factor: number) => {
    let sum = 0
    for (let i = 0; i < factor - 1; i++) sum += parseInt(digits[i]) * (factor - i)
    const rem = (sum * 10) % 11
    return rem >= 10 ? 0 : rem
  }

  return (
    calc(clean, 10) === parseInt(clean[9]) &&
    calc(clean, 11) === parseInt(clean[10])
  )
}

export function formatCpf(value: string): string {
  const clean = value.replace(/\D/g, '').slice(0, 11)
  return clean
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
}

export function formatPhone(value: string): string {
  const clean = value.replace(/\D/g, '').slice(0, 11)
  if (clean.length <= 10) {
    return clean
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
  }
  return clean
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
}

export function validateCrp(crp: string): boolean {
  return /^\d{2}\/\d{4,6}$/.test(crp.trim())
}
