import type { BranchCourierCreate, Courier, PaginatedResponse } from '@/types/service.type'
import { ApiService } from '@/services/api.service'

export class CourierService extends ApiService {
  constructor() {
    super('courier')
  }

  async createCourier(newCourier: BranchCourierCreate): Promise<void> {
    await this.client.post('new', newCourier)
  }
  async listCourier(): Promise<PaginatedResponse<Courier>> {
    const res = await this.client.get('list')
    return this.unpackRes(res) as PaginatedResponse<Courier>
  }
  async deleteCouier(index: number): Promise<void> {
    await this.client.delete(`${index}/remove`)
  }
}
