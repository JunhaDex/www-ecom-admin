import type { PageMeta } from './ui.type'

export interface PaginatedResponse<T> {
  list: T[]
  meta: PageMeta
}

export interface BranchUser {
  id: number
  branchName: string
  branchManager: string
  branchContact: string
  userId: string
  status: number
  createdAt: Date
}

export interface BranchUserCreate {
  branchName: string
  branchManager: string
  branchContact: string
  userId: string
  pwd: string
}
