import { PurchaseModel } from '../models/purchase'

export interface LoadPurchases {
  load (cpf: string): Promise<PurchaseModel[]>
}
