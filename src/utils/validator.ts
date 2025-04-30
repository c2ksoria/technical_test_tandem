// utils/validateJson.js
const validateJson = (jsonString) => {
  console.log('Validando JSON:', jsonString)
  try {
    JSON.parse(jsonString)
    return { valid: true, error: '' }
  } catch (err) {
    return { valid: false, error: 'JSON inválido: ' + err.message }
  }
}

// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
// const jsonInicial = {
//   formTitle: 'Registro de Usuario',
//   fields: [
//     {
//       name: 'nombre',
//       label: 'Nombre y Apellido',
//       type: 'text',
//       default: '',
//       validations: [
//         {
//           type: 'required',
//           message: 'El nombre es obligatorio.',
//         },
//         {
//           type: 'minLength',
//           value: 3,
//           message: 'El nombre debe tener al menos 3 caracteres.',
//         },
//         {
//           type: 'maxLength',
//           value: 50,
//           message: 'El nombre debe tener como máximo 50 caracteres.',
//         },
//         {
//           type: 'regex',
//           pattern: '^[a-zA-ZáéíóúÁÉÍÓÚ\\s]+$',
//           message: 'El nombre solo puede contener letras y espacios.',
//         },
//       ],
//     },
//     {
//       name: 'mail',
//       label: 'Mail',
//       type: 'email',
//       default: '',
//       validations: [
//         {
//           type: 'required',
//           message: 'El mail es obligatorio.',
//         },
//         {
//           type: 'regex',
//           pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
//           message: 'El formato del mail es inválido.',
//         },
//         {
//           type: 'maxLength',
//           value: 30,
//           message: 'El mail debe tener como máximo 30 caracteres.',
//         },
//       ],
//     },
//     {
//       name: 'codArea',
//       label: 'Código de Área',
//       type: 'number',
//       default: '',
//       validations: [
//         {
//           type: 'required',
//           message: 'El código de área es obligatorio.',
//         },
//         {
//           type: 'maxLength',
//           value: 4,
//           message: 'El código de área debe tener máximo 4 dígitos.',
//         },
//       ],
//     },
//     {
//       name: 'telefono',
//       label: 'Teléfono',
//       type: 'number',
//       default: '',
//       validations: [
//         {
//           type: 'required',
//           message: 'El teléfono es obligatorio.',
//         },
//         {
//           type: 'minLength',
//           value: 7,
//           message: 'El teléfono debe tener al menos 7 dígitos.',
//         },
//       ],
//     },
//     {
//       name: 'vivienda',
//       label: 'Vivienda',
//       type: 'selectable',
//       default: '',
//       options: ['Casa', 'Departamento'],
//       validations: [
//         {
//           type: 'required',
//           message: 'La selección de vivienda es obligatoria.',
//         },
//       ],
//     },
//   ],
// }

// const detectTypeInput = (validatioType, value, message, pattern) => {
//   console.log(
//     '---validation: ',
//     validatioType,
//     '--- valor: ',
//     value,
//     '---mensaje: ',
//     message,
//     '---pattern:',
//     pattern,
//   )
//   switch (validatioType) {
//     case 'required':
//       return !!value || message
//     case 'minLength':
//       return value?.length >= (value ?? 0) || message
//     case 'maxLength':
//       return value?.length <= (value ?? 0) || message
//     case 'regex':
//       const re = new RegExp(value || '')
//       return re.test(value || '') || message
//     default:
//       return () => true
//   }
// }

// for (let index = 0; index < jsonInicial.fields.length; index++) {
//   console.log('--------', jsonInicial.fields[index].name, '--------')
//   for (let index1 = 0; index1 < jsonInicial.fields[index].validations.length; index1++) {
//     const datos = detectTypeInput(
//       jsonInicial.fields[index].validations[index1].type,
//       jsonInicial.fields[index].validations[index1].value || '',
//       jsonInicial.fields[index].validations[index1].message,
//       jsonInicial.fields[index].validations[index1].pattern || '',
//     )
//   }
// }

export { validateJson }
