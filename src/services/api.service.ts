import axios, { type AxiosResponse } from 'axios'
import { useAuthStore } from '@/stores/auth.store'

export abstract class ApiService {
  protected client

  protected authStore

  protected constructor(resource: string) {
    this.authStore = useAuthStore()
    this.client = axios.create({
      baseURL: `${import.meta.env.VITE_API_BASE_URL}/${resource}`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    this.client.interceptors.response.use(
      (res) => {
        return res
      },
      (err) => {
        if (err.response.status === 401) {
          window.alert('만료된 인증정보 입니다.')
          this.fallbackAuth()
        }
        return Promise.reject(err)
      },
    )
    if (this.authStore.state.token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${this.authStore.state.token}`
    }
  }

  unpackRes(res: AxiosResponse): unknown {
    return res.data.result
  }

  fallbackAuth() {
    this.authStore.invalidate()
    window.location.href = '/login'
  }
}
