type FormData = { [key: string]: any }

type FormRule =
  | {
      type: 'range'
      field: string
      min: number
      max: number
      message: string
    }
  | {
      type: 'domain'
      field: string
      allowedDomains: [string]
      message: string
    }
  | {
      type: 'matchField'
      field: string
      target: string
      message: string
    }

export function validateFormRules(
  formData: FormData,
  formRules: FormRule[],
  errorMessage: { value: string | null },
): boolean {
  errorMessage.value = null // reset

  for (const rule of formRules) {
    const value = formData[rule.field]

    switch (rule.type) {
      case 'range':
        if (isNaN(value) || value < rule.min || value > rule.max) {
          errorMessage.value = rule.message
          return false
        }
        break

      case 'domain':
        if (
          typeof value !== 'string' ||
          !rule.allowedDomains.some((domain) => value.endsWith(`@${domain}`))
        ) {
          errorMessage.value = rule.message
          return false
        }
        break

      case 'matchField':
        const targetValue = formData[rule.target]
        if (value !== targetValue) {
          errorMessage.value = rule.message
          return false
        }
        break

      default:
        console.warn(`Tipo de regla no reconocida: ${rule.type}`)
        break
    }
  }

  return true
}
