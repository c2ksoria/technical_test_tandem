<template>
  <v-container class="pa-4">
    <!-- Editor de JSON -->
    <v-textarea
      v-model="jsonText"
      label="Editor de JSON"
      auto-grow
      outlined
      rows="10"
      class="mb-4"
    ></v-textarea>

    <!-- Subir archivo -->
    <v-file-input
      label="Subir JSON desde tu computadora"
      accept=".json"
      show-size
      @update:modelValue="onFileUpload"
      class="mb-4"
    ></v-file-input>

    <!-- Botón de validar -->
    <v-btn :color="isValidJson ? 'green' : 'red'" @click="validateJson" class="mb-4">
      {{ isValidJson ? 'Validado ✅' : 'Validar JSON' }}
    </v-btn>

    <!-- Botón de guardar (solo si es válido) -->
    <v-btn v-if="isValidJson" color="blue" @click="saveChanges" class="mb-4 ml-4">
      Guardar cambios
    </v-btn>

    <!-- Mensaje de error -->
    <v-alert v-if="validationError" type="error" class="mt-4" dense>
      {{ validationError }}
    </v-alert>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import procesarJson from '/src/utils/procesarJson.js'
import { useFormStorage } from '../../stores/configFormStore'
import validarEstructura from '/src/utils/validator'
// Variables reactivas
const jsonText = ref('')
const isValidJson = ref(false)
const validationError = ref('')

// Instanciás el store
const formStore = useFormStorage()
const { loading, dataForm, titleForm } = storeToRefs(formStore)

// Función: validar JSON
const validateJson = () => {
  let tipoDeError: 'ninguno' | 'sintaxis' | 'estructura' = 'ninguno'

  try {
    const tempJSON = JSON.parse(jsonText.value)

    const validFields = validarEstructura(tempJSON)
    if (!validFields.valido) {
      tipoDeError = 'estructura'
      throw new Error(validFields.error)
    }

    isValidJson.value = true
    validationError.value = ''
  } catch (err: unknown) {
    isValidJson.value = false

    if (tipoDeError === 'estructura') {
      validationError.value = '❌ Estructura inválida: ' + (err as Error).message
    } else {
      validationError.value = '❌ JSON inválido (sintaxis): ' + (err as Error).message
    }
  }
}

// Función: guardar cambios (ejemplo simple)
const saveChanges = () => {
  try {
    const parsed = JSON.parse(jsonText.value)
    alert('¡JSON guardado!')
    validationError.value = ''
    const temporal = procesarJson(JSON.parse(jsonText.value))
    if (temporal.success === false) {
      throw new Error('Hubo un error al procesar el archivo, favor de corregirlo')
    }
    dataForm.value = temporal.data
    titleForm.value = parsed.formTitle
    loading.value = false
    isValidJson.value = false // 🔥 Reseteamos el estado
  } catch (error) {
    console.log(error)
  }
}

// Función: cargar JSON desde archivo
const onFileUpload = (file: File | File[] | null) => {
  if (!file) return

  // Si el usuario habilita multiple files en el input
  const selectedFile = Array.isArray(file) ? file[0] : file

  const reader = new FileReader()

  reader.onload = (e) => {
    try {
      const content = e.target?.result as string
      JSON.parse(content) // Validar primero
      jsonText.value = content
      isValidJson.value = true
      validationError.value = ''
      dataForm.value = JSON.parse(jsonText.value)
    } catch (error: unknown) {
      isValidJson.value = false
      validationError.value = 'El archivo subido no es un JSON válido. ' + (error as Error).message
    }
  }

  reader.readAsText(selectedFile)
}
</script>

<style scoped>
.v-textarea {
  font-family: monospace;
}
</style>
