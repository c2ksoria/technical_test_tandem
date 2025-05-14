<template>
  <v-container>
    <!-- Cargando JSON -->
    <div v-if="dataStore.loading" class="d-flex justify-center align-center" style="height: 300px">
      <v-tooltip text="Favor de Validar y Guardar el JSON" bottom>
        <template v-slot:activator="{ props }">
          <v-progress-circular v-bind="props" indeterminate color="primary" size="64" />
        </template>
      </v-tooltip>
    </div>

    <!-- Formulario dinámico -->
    <div v-else>
      <h1>{{ dataStore.titleForm }}</h1>

      <v-form ref="formRef" @submit.prevent="submitForm">
        <div v-for="(field, index) in dataStore.dataForm" :key="field.name">
          <component
            :is="isSelect(field) ? BaseSelect : BaseInput"
            v-model="formData[field.name]"
            :type="field.type"
            :label="field.label"
            :placeholder="field.label"
            :items="field.options || []"
            :rules="field.rules"
            :required="true"
          />
        </div>
        <v-switch v-model="simulateError" label="Simular error en el envío" color="red" />
        <v-btn type="submit" class="mt-4" color="primary">Enviar</v-btn>
        <div class="mt-4">
          <v-alert v-model="showAlert" :type="typeAlert" closable>
            {{ alertMessage }}
          </v-alert>
        </div>
      </v-form>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFormStorage } from '../../stores/configFormStore'
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'
import { validateFormRules } from '../../utils/formRules'
import axios from 'axios' // Asegurate de tenerlo instalado con: npm install axios

const formRef = ref()
const alertMessage = ref<string | null>(null)
const showAlert = ref(false)
const typeAlert = ref('error')
const dataStore = useFormStorage()
const formData = ref<Record<string, any>>({})

// Función para detectar si el tipo es seleccionable
const isSelect = (field: any) => field.type === 'select' || field.type === 'selectable'

// Inicializar campos con valores por defecto
onMounted(() => {
  if (Array.isArray(dataStore.dataForm)) {
    const data: Record<string, any> = {}
    dataStore.dataForm.forEach((field) => {
      data[field.name] = field.default ?? ''
    })
    formData.value = data
  }
})

function displayAlert(mensaje: string, tipo: string = 'error') {
  alertMessage.value = mensaje
  typeAlert.value = tipo
  showAlert.value = true
}

function resetForm() {
  formRef.value.reset() // reinicia los valores visuales
  formRef.value.resetValidation() // limpia validaciones
}

// Acción del botón Enviar

const simulateError = ref(false) // ← Podés vincularlo a un toggle o checkbox

async function submitForm() {
  const result = await formRef.value?.validate()

  if (!result?.valid) {
    return displayAlert('Por favor corrige los campos indicados.', 'error')
  }

  const hasGlobalRules = Array.isArray(dataStore.formRules) && dataStore.formRules.length > 0

  if (hasGlobalRules) {
    const isFormValid = validateFormRules(formData.value, dataStore.formRules, alertMessage)

    if (!isFormValid) {
      return displayAlert(alertMessage.value || 'Formulario inválido.', 'error')
    }
  }

  // 🎯 Todo válido: simular envío
  try {
    const apiURL = simulateError.value
      ? 'https://api.invalida.com/error' // ❌ URL inválida para forzar error
      : 'https://jsonplaceholder.typicode.com/posts' // ✅ API falsa válida

    const response = await axios.post(apiURL, formData.value)

    console.log('📡 Respuesta del servidor:', response.data)

    displayAlert('✅ Formulario enviado con éxito.', 'success')
    resetForm()
  } catch (err: any) {
    console.error('❌ Error en la API:', err.message || err)
    displayAlert('Error al enviar el formulario. Intenta nuevamente.', 'error')
  }
}
</script>
