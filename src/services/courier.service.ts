import type { PaginatedResponse, Courier } from '@/types/service.type'
import { ApiService } from '@/services/api.service'

export class CourierService extends ApiService {
  constructor() {
    super('courier')
  }

  async listCourier(): Promise<PaginatedResponse<Courier>> {
    const res = await this.client.get('list')
    return this.unpackRes(res) as PaginatedResponse<Courier>

  }
}
