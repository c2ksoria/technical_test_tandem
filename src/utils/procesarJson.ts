// Función para procesar el JSON de entrada y devolver un nuevo JSON con una nueva estructura acorde al post procesamiento de inputs y sus rules
const procesarJson = (jsonInicial) => {
  // console.log('Procesando JSON dentro de procesarJson')
  const finalJson = []
  var tempValidations = []
  var rules = []
  var success = true
  var errorMessage = ''

  // Función para detectar el tipo de validación y devolver la función de validación a procesar dependiendo del tipo de validación
  const detectTypeInput = (validatioType, value, message, pattern) => {
    switch (validatioType) {
      case 'required':
        return (v) => !!v || message
      case 'minLength':
        return (v) => v.length >= value || message
      case 'maxLength':
        return (v) => v.length < value || message
      case 'regex': {
        // console.log(pattern)
        const regex = new RegExp(pattern)
        return (v) => regex.test(v) || message
      }
      default:
        return ''
    }
  }
  // Procesamiento del JSON de entrada
  try {
    //Primer for para recorrer los campos principales de Fields
    for (let index = 0; index < jsonInicial.fields.length; index++) {
      // console.log('--------',jsonInicial.fields[index].name,'--------')
      var options = []

      if (jsonInicial.fields[index].options) {
        options = jsonInicial.fields[index].options
      }
      finalJson.push({
        name: jsonInicial.fields[index].name,
        label: jsonInicial.fields[index].label,
        type: jsonInicial.fields[index].type,
        default: jsonInicial.fields[index].default,
        value: '',
        options: options,
      })
      //Segundo for para recorrer las validaciones
      for (let index1 = 0; index1 < jsonInicial.fields[index].validations.length; index1++) {
        var tempPattern = ''
        if (jsonInicial.fields[index].validations[index1].pattern) {
          tempPattern = jsonInicial.fields[index].validations[index1].pattern
        }
        const datos = detectTypeInput(
          jsonInicial.fields[index].validations[index1].type,
          jsonInicial.fields[index].validations[index1].value || '',
          jsonInicial.fields[index].validations[index1].message || '',
          tempPattern || '',
        )
        // Asiganción de la función de validación a la regla
        rules.push(datos)

        //Crear arreglo de validaciones por campo unitario de Fields
        tempValidations.push({
          type: jsonInicial.fields[index].validations[index1].type,
          value: jsonInicial.fields[index].validations[index1].value || '',
          message: jsonInicial.fields[index].validations[index1].message || '',
          pattern: jsonInicial.fields[index].validations[index1].pattern || '',
        })
      }
      //Agregar validaciones a cada campo unitario de Fields
      finalJson[index].validations = tempValidations
      //Agregar reglas a cada campo unitario de Fields
      finalJson[index].rules = rules
      //reseteo de variables temporales
      tempValidations = []
      rules = []
    }
  } catch (error) {
    errorMessage = 'Hubo un Error en el procesamiento, error:' & error
    success = false
  }
  return { success: success, errorMessage: errorMessage, data: finalJson }
}
export default procesarJson
