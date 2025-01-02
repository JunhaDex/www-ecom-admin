import type { Notice, NoticeCreateInput, PaginatedResponse } from '@/types/service.type'
import { ApiService } from '@/services/api.service'

export class NoticeService extends ApiService {
  constructor() {
    super('notice')
  }

  async listNotice(): Promise<PaginatedResponse<Notice>> {
    const res = await this.client.get('list')
    return this.unpackRes(res) as PaginatedResponse<Notice>
  }

  async createNotice(newNotice: NoticeCreateInput): Promise<void> {
    await this.client.post('new', newNotice)
  }

  async deleteNotice(index: number): Promise<void> {
    await this.client.delete(`${index}/remove`)
  }
}
