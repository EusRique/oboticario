import { PurchaseModel } from '../models/purchase'

export interface LoadPurchases {
  load (): Promise<PurchaseModel[]>
}
