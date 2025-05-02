<!-- Componente Princial de la app -->
<template>
  <v-app>
    <AppBar />
    <v-main>
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
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import DinamicForm from './components/ui/DinamicForm.vue'
import JsonEditor from './components/ui/JsonEditiorNew.vue'
import AppBar from './components/ui/TopSidebar.vue'

// const dataForms = ref(data)
</script>
