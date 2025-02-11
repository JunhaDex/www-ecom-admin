import type { PaginatedResponse, TxAdminItem, UpdateTrackingInput } from '@/types/service.type'
import { ApiService } from '@/services/api.service'

export class TxService extends ApiService {
  constructor() {
    super('tx')
  }

  async listTx(): Promise<PaginatedResponse<TxAdminItem>> {
    const res = await this.client.get('list')
    return this.unpackRes(res) as PaginatedResponse<TxAdminItem>
  }

  async getTx(id: number): Promise<TxAdminItem> {
    const res = await this.client.get(`${id}`)
    return this.unpackRes(res) as TxAdminItem
  }

  async updateTxShipment(id: number, shipment: UpdateTrackingInput): Promise<void> {
    await this.client.put(`${id}/shipment`, {
      ...shipment,
      status: 3,
    })
  }
}
