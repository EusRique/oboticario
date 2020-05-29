import { PurchaseModel } from '../../../../domain/models/purchase'

export interface LoadPurchaseRepository {
  loadAll (accountId: string): Promise<PurchaseModel[]>
}
