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
        } else if (err.response.status === 500) {
          // this.authStore.circuitBreak = true
          window.location.href = '/error'
        }
        return Promise.reject(err)
      },
    )
  }

  auth(): this {
    const token = this.authStore.state.token
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`
      return this
    }
    throw new Error('token not found')
  }

  unpackRes(res: AxiosResponse): unknown {
    return res.data.result
  }

  fallbackAuth() {
    this.authStore.invalidate()
    window.location.href = '/login'
  }
}
