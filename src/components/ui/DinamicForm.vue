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

function showMessage(mensaje: string) {
  showAlert.value = true
  alertMessage.value = mensaje
  console.log(showAlert.value)
}

function resetForm() {
  formRef.value.reset() // reinicia los valores visuales
  formRef.value.resetValidation() // limpia validaciones
}

// Acción del botón Enviar
async function submitForm() {
  const result = await formRef.value?.validate()

  if (result?.valid) {
    // Validar reglas de validación
    if (dataStore.formRules === undefined) {
      // Si no hay reglas de validación globales
      typeAlert.value = 'success'
      alertMessage.value = 'Formulario enviado con éxito.'
      showMessage(alertMessage.value)
      resetForm()
    } else {
      // Hay reglas de validación globales
      const isFormValid = validateFormRules(formData.value, dataStore.formRules, alertMessage)
      if (!isFormValid || !Array.isArray(dataStore.formRules)) {
        typeAlert.value = 'error'
        showMessage(alertMessage.value)
        return
      } else {
        console.log('✅ Formulario válido:', formData.value)
        typeAlert.value = 'success'
        alertMessage.value = 'Formulario enviado con éxito.'
        showMessage(alertMessage.value)
        resetForm()
      }
    }
  } else {
    // Mostrar errores
    alertMessage.value = 'Por favor corrige los campos indicados.'
    typeAlert.value = 'error'
    showMessage(alertMessage.value)
  }
}
</script>
