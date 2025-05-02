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

      <v-form @submit.prevent="submitForm">
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
      </v-form>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFormStorage } from '../../stores/configFormStore'
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'

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

// Acción del botón Enviar
function submitForm() {
  console.log('Formulario enviado:', formData.value)
}
</script>
