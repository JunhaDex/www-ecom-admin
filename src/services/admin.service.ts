import { ApiService } from '@/services/api.service'
import type { Admin, AdminCreateInput, PaginatedResponse } from '@/types/service.type'

export class AdminService extends ApiService {
  constructor() {
    super('auth')
  }

  async listAdmin(): Promise<PaginatedResponse<Admin>> {
    const res = await this.client.get('list')
    return this.unpackRes(res) as PaginatedResponse<Admin>
  }

  async createAdmin(newAdmin: AdminCreateInput): Promise<void> {
    await this.client.post('new', newAdmin)
  }

  async deleteAdmin(index: number): Promise<void> {
    await this.client.delete(`${index}/remove`)
  }
}
