import type { BranchUser } from '@/types/service.type'
import { ApiService } from '@/services/api.service'

export class GroupService extends ApiService {
  constructor() {
    super('user/group')
  }

  async addUserToGroup(index: number, targetUsers: BranchUser[]): Promise<void> {
    await this.client.post(`${index}/user/add`, { users: targetUsers })
  }
}
