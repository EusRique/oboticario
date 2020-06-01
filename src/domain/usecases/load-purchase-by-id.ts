import { PurchaseModel } from '../models/purchase'

export interface LoadPurchaseById {
  loadById (id: string): Promise<PurchaseModel>
}
