import type { PaginatedResponse, TxAdminItem } from '@/types/service.type'
import { ApiService } from '@/services/api.service'

export class TxService extends ApiService {
  constructor() {
    super('tx')
  }

  async listTx(): Promise<PaginatedResponse<TxAdminItem>> {
    const res = await this.client.get('list')
    return this.unpackRes(res) as PaginatedResponse<TxAdminItem>

  }
}
