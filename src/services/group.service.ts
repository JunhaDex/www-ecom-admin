import type { PaginatedResponse, UserGroup } from '@/types/service.type'

export class GroupService extends ApiService {
  constructor() {
    super('group')
  }

  async listGroup(): Promise<PaginatedResponse<UserGroup>> {}
}
