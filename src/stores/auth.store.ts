import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Admin } from '@/types/service.type'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const state = ref<{
      token: string | null
    }>({ token: null })
    const admin = ref<Admin | null>(null)

    function isAuthenticated() {
      return state.value.token !== null
    }

    function setCredential(token: string) {
      state.value.token = token
    }

    function invalidate() {
      state.value.token = null
    }

    return { state, admin, isAuthenticated, setCredential, invalidate }
  },
  { persist: true },
)
