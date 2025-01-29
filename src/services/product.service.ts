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

  async getProduct(index: number): Promise<Product> {
    const res = await this.client.get(`${index}`)
    return this.unpackRes(res) as Product
  }

  async createProduct(newProduct: FormData): Promise<void> {
    await this.client.post('new', newProduct, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }

  async updateProduct(index: number, product: FormData): Promise<void> {
    await this.client.put(`${index}/update`, product, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }

  async deleteProduct(index: number): Promise<void> {
    await this.client.delete(`${index}/remove`)
  }
}
