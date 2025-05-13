// Tipos
type Validation = {
  type: string
  value?: string
  message?: string
  pattern?: string
}

type Field = {
  name: string
  label: string
  type: string
  default?: string
  options?: string[]
  validations: Validation[]
}

type InputJson = {
  fields: Field[]
}

type FieldProcessed = {
  name: string
  label: string
  type: string
  default?: string
  value: string
  options: string[]
  validations: Validation[]
  rules: ((v: any) => boolean | string)[]
}

type ProcessedResult = {
  success: boolean
  errorMessage: string
  data: FieldProcessed[]
}

// Función auxiliar para detectar el tipo de validación
const detectTypeInput = (
  validationType: string,
  value: string,
  message: string,
  pattern: string,
): ((v: any) => boolean | string) => {
  switch (validationType) {
    case 'required':
      return (v) => !!v || message
    case 'minLength':
      return (v) => String(v).length >= parseInt(value) || message
    case 'maxLength':
      return (v) => String(v).length <= parseInt(value) || message
    case 'regex':
      try {
        const regex = new RegExp(pattern)
        return (v) => regex.test(v) || message
      } catch {
        return () => `Error en expresión regular: ${pattern}`
      }
    default:
      return () => ''
  }
}

// Función principal
const procesarJson = (jsonInicial: InputJson): ProcessedResult => {
  const finalJson: FieldProcessed[] = []
  let tempValidations: Validation[] = []
  let rules: ((v: any) => boolean | string)[] = []
  let success = true
  let errorMessage = ''

  try {
    for (let index = 0; index < jsonInicial.fields.length; index++) {
      const field = jsonInicial.fields[index]
      const options = field.options || []

      finalJson.push({
        name: field.name,
        label: field.label,
        type: field.type,
        default: field.default,
        value: '',
        options,
        validations: [],
        rules: [],
      })

      for (let i = 0; i < field.validations.length; i++) {
        const v = field.validations[i]
        const pattern = v.pattern || ''
        const ruleFn = detectTypeInput(v.type, v.value || '', v.message || '', pattern)

        rules.push(ruleFn)
        tempValidations.push({
          type: v.type,
          value: v.value || '',
          message: v.message || '',
          pattern: pattern,
        })
      }

      finalJson[index].validations = tempValidations
      finalJson[index].rules = rules

      // Reset
      tempValidations = []
      rules = []
    }
  } catch (error: any) {
    errorMessage = 'Hubo un Error en el procesamiento: ' + error.message
    success = false
  }

  return { success, errorMessage, data: finalJson }
}

export default procesarJson
