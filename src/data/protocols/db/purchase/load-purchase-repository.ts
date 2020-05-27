import { PurchaseModel } from '../../../../domain/models/purchase'

export interface LoadPurchaseRepository {
  loadAll (): Promise<PurchaseModel[]>
}
