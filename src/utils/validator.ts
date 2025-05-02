// Este archivo contiene la función de validación para la estructura del JSON
const validarEstructura = (json) => {
  if (!json || typeof json !== 'object') {
    return { valido: false, error: 'El contenido no es un objeto válido' }
  }

  if (!('formTitle' in json)) return { valido: false, error: 'Falta el campo "formTitle"' }

  if (!('fields' in json)) return { valido: false, error: 'Falta el campo "fields"' }

  if (!Array.isArray(json.fields)) return { valido: false, error: '"fields" no es un array' }

  return { valido: true }
}

export default validarEstructura
