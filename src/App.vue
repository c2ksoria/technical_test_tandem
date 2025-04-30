<!-- Componente Princial de la app -->
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6" class="pa-5" style="background-color: lightblue">
        <DinamicForm />
      </v-col>
      <v-col cols="12" md="6" class="pa-5" style="background-color: lightcoral">
        <JsonEditor />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
// import data from './data/data.json'
import DinamicForm from './components/ui/DinamicForm.vue'
import JsonEditor from './components/ui/JsonEditiorNew.vue'
// import StoreData from './components/ui/StoreData1.vue'

// const dataForms = ref(data)
</script>
