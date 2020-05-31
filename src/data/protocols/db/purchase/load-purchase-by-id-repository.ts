import { PurchaseModel } from '../../../../domain/models/purchase'

export interface LoadPurchaseByIdRepository {
  loadById: (id: string) => Promise<PurchaseModel>
}
