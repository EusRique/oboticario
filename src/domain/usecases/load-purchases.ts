import { PurchaseModel } from '../models/purchase'

export interface LoadPurchases {
  load (accountId: string): Promise<PurchaseModel[]>
}
