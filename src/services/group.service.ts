import type { PaginatedResponse, UserGroup, UserGroupCreate } from '@/types/service.type'
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
  async addUserToGroup(index: number, targetUsers: BranchUser[]): Promise<void> {
    await this.client.post(`${index}/user/add`, { users: targetUsers })
  }

  async createGroup(newGroup: UserGroupCreate): Promise<void> {
    await this.client.post('new', newGroup)
  }
}
