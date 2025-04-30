export function makeRules(field: {
  validations: Array<{
    type: string
    value?: number
    pattern?: string
    message: string
  }>
}): Array<(v: any) => boolean | string> {
  return field.validations.map((v) => {
    // log al crear la regla
    console.log(`🛠 Creando regla "${v.type}" para el campo`, field.name)

    switch (v.type) {
      case 'required':
        // devolvemos la función que luego ejecutará Vuetify,
        // y dentro de ella ya existe 'value'
        return (value: any) => {
          console.log(`🔍 Ejecutando "required" con valor:`, value)
          return !!value || v.message
        }

      case 'minLength':
        return (value: string) => {
          console.log(`🔍 Ejecutando "minLength >= ${v.value}" con valor:`, value)
          return value?.length >= (v.value ?? 0) || v.message
        }

      case 'maxLength':
        return (value: string) => {
          console.log(`🔍 Ejecutando "maxLength <= ${v.value}" con valor:`, value)
          return value?.length <= (v.value ?? 0) || v.message
        }

      case 'regex':
        const re = new RegExp(v.pattern || '')
        return (value: string) => {
          console.log(`🔍 Ejecutando "regex ${v.pattern}" con valor:`, value)
          return re.test(value || '') || v.message
        }

      default:
        return () => true
    }
  })
}
