import { ApiService } from '@/services/api.service'
import type { BranchUser, BranchUserCreate, PaginatedResponse } from '@/types/service.type'

export class UserService extends ApiService {
  constructor() {
    super('user')
  }

  async listUser(): Promise<PaginatedResponse<BranchUser>> {
    const res = await this.client.get('list')
    return this.unpackRes(res) as PaginatedResponse<BranchUser>
  }

  async createUser(newUser: BranchUserCreate): Promise<void> {
    await this.client.post('new', newUser)
  }

  async deleteUser(index: number): Promise<void> {
    await this.client.delete(`${index}/remove`)
  }
}
