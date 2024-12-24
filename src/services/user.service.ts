import { ApiService } from '@/services/api.service'
import type { BranchUser, PaginatedResponse } from '@/types/service.type'

export class UserService extends ApiService {
  constructor() {
    super('user')
  }

  async createUser(data: any): Promise<void> {
    await this.client.post('new', data)
  }

  async listUser(): Promise<PaginatedResponse<BranchUser>> {
    const res = await this.client.get('list')
    return this.unpackRes(res) as PaginatedResponse<BranchUser>
  }
}
