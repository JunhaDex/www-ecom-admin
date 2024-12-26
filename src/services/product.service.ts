import type { PaginatedResponse, Product } from '@/types/service.type'
import { ApiService } from '@/services/api.service'

export class ProductService extends ApiService {
  constructor() {
    super('product')
  }

  async listProduct(): Promise<PaginatedResponse<Product>> {
    const res = await this.client.get('list')
    return this.unpackRes(res) as PaginatedResponse<Product>
  }
}
