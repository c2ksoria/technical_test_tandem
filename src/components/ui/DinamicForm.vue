<template>
  <v-container>
    <div v-if="dataStore.loading">
      <v-tooltip text="Favor de Validar y Guardar el JSON" bottom>
        <template v-slot:activator="{ props }">
          <v-progress-circular v-bind="props" indeterminate />
        </template>
      </v-tooltip>
    </div>

    <div v-else>
      <h1>{{ dataStore.titleForm }}</h1>

      <v-form @submit.prevent="submitForm">
        <div v-for="(field, index) in dataStore.dataForm" :key="field.name">
          <BaseInput
            v-model="formData[field.name]"
            :type="field.type"
            :label="field.label"
            :placeholder="field.label"
            :rules="field.rules"
            required
          />
        </div>

        <v-btn type="submit" class="mt-4" color="primary">Enviar</v-btn>
      </v-form>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFormStorage } from '../../stores/configFormStore'
import BaseInput from './BaseInput.vue'

const dataStore = useFormStorage()
const formData = ref<Record<string, any>>({})

// Inicializar formData con los valores por defecto
onMounted(() => {
  if (Array.isArray(dataStore.dataForm)) {
    const data = {}
    dataStore.dataForm.forEach((field) => {
      data[field.name] = field.default || ''
    })
    formData.value = data
  }
})

// Enviar el formulario
function submitForm() {
  console.log('Formulario enviado:', formData.value)
}
</script>
