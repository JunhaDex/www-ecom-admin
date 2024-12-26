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
  userGroup: UserGroup
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

export interface BranchCourierCreate {
  courierName: string;
  apiUrl: string;
}


export interface UserGroup {
  id: number
  groupName: string
  description: string
  createdAt: Date
  userCount?: number
  productCount?: number
}

export interface UserGroupCreate {
  groupName: string
  description: string
  products?: Product[]
}

export interface Product {
  id: number
  productName: string
  description: string
  productPrice: number
  status: string
  createdAt: Date
}

export interface TxAdminItem {
  id: number
  txName: string
  txNote: string
  status: number
  payment: Payment
  user: {
    id: number
    userId: string
    branchName: string
    branchManager: string
    branchContact: string
  }
  products: {
    product: Product
    count: number
    price: number
  }[]
  shipment?: Shipment
  createdAt: Date
}

export interface Payment {
  id: number
  sessionKey: string
  payMethod: string
  paymentKey: string
  orderId: string
  paidAmount: number
  balanceAmount: number
  paidAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface Shipment {
  id: number
  txId: number
  courierId: number
  address: string
  recipientName: string
  recipientPhone: string
  trackingNo: string
  status: number
  createdAt: Date
  updatedAt: Date
  courier?: Courier
  transaction?: Transaction
}

export interface Courier {
  id: number
  courierName: string
  apiUrl: string
  createdAt: Date
}

export interface Transaction {
  id: number
  paymentId: number
  txName: string
  txNote: string
  userId: number
  status: number
  createdAt: Date
  updatedAt: Date
  payment?: Payment
  user?: User
  products?: {
    product: Product
    count: number
    price: number
  }[]
}

export interface User {
  id: number
  userId: string
  branchName: string
  branchManager: string
  branchContact: string
  status: number
  createdAt: Date
  updatedAt: Date
  userGroup?: UserGroup
}
