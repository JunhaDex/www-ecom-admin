import type { PaginatedResponse, Product, UserGroup, UserGroupCreate } from '@/types/service.type'
import { ApiService } from '@/services/api.service'
import type { BranchUser } from '@/types/service.type'

export class GroupService extends ApiService {
  constructor() {
    super('user/group')
  }

  async listGroup(): Promise<PaginatedResponse<UserGroup>> {
    const res = await this.client.get('list')
    return this.unpackRes(res) as PaginatedResponse<UserGroup>
  }

  async getGroup(groupId: number): Promise<{
    group: UserGroup
    products: Product[]
  }> {
    const res = await this.client.get(`${groupId}`)
    const raw = this.unpackRes(res) as any
    return {
      group: {
        id: raw.id,
        groupName: raw.groupName,
        description: raw.description,
        createdAt: raw.createdAt,
        userCount: raw.users.length,
        productCount: raw.products.length,
      },
      products: raw.products,
    }
  }

  async addUserToGroup(index: number, targetUsers: BranchUser[]): Promise<void> {
    await this.client.post(`${index}/user/add`, { users: targetUsers })
  }

  async createGroup(newGroup: UserGroupCreate): Promise<void> {
    await this.client.post('new', newGroup)
  }

  async updateGroup(index: number, group: UserGroupCreate): Promise<void> {
    await this.client.put(`${index}/update`, group)
  }

  async addGroupProduct(index: number, products: Product[]): Promise<void> {
    await this.client.post(`${index}/product/add`, { products })
  }

  async removeGroupProduct(index: number, products: Product[]): Promise<void> {
    await this.client.post(`${index}/product/remove`, { products })
  }

  async deleteGroup(index: number): Promise<void> {
    await this.client.delete(`${index}/remove`)
  }
}
