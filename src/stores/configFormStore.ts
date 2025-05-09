import { defineStore } from 'pinia'

export const useFormStorage = defineStore('config', {
  state: () => ({
    dataForm: [],
    loading: true as boolean,
    titleForm: '',
    formRules: [],
  }),
  actions: {
    setForm(newData) {
      this.dataForm = newData
      localStorage.setItem('dataForm', newData) // Guardar en localStorage
      this.loading = false
    },
    clearForm() {
      this.dataForm = ''
      localStorage.removeItem('dataForm')
    },
  },
})
