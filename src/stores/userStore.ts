import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
  }),
  actions: {
    setUsername(newName) {
      this.username = newName
      localStorage.setItem('username', newName) // Guardar en localStorage
    },
    loadUsername() {
      const savedName = localStorage.getItem('username')
      if (savedName) {
        this.username = savedName
      }
    },
    clearUsername() {
      this.username = ''
      localStorage.removeItem('username')
    },
  },
})
