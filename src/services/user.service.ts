import { ApiService } from '@/services/api.service'
import type { BranchUser, BranchUserCreate, BranchUserUpdate, PaginatedResponse } from '@/types/service.type'

export class UserService extends ApiService {
  constructor() {
    super('user')
  }

  async listUser(): Promise<PaginatedResponse<BranchUser>> {
    const res = await this.client.get('list')
    return this.unpackRes(res) as PaginatedResponse<BranchUser>
  }

  async getUser(index: number): Promise<BranchUser> {
    const res = await this.client.get(`${index}`)
    return this.unpackRes(res) as BranchUser
  }

  async createUser(newUser: BranchUserCreate): Promise<void> {
    await this.client.post('new', newUser)
  }

  async updateUser(index: number, user: BranchUserUpdate): Promise<void> {
    await this.client.put(`${index}/update`, user)
  }

  async deleteUser(index: number): Promise<void> {
    await this.client.delete(`${index}/remove`)
  }
}
