import type {PaginatedResponse, UserGroup } from '@/types/service.type'
import { ApiService } from '@/services/api.service'

export class GroupService extends ApiService {
  constructor() {
    super('user/group')
  }

  async listGroup(): Promise<PaginatedResponse<UserGroup>> {
    const res = await this.client.get('list')
    return this.unpackRes(res) as PaginatedResponse<UserGroup>

  }
}
