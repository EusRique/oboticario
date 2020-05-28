import { PurchaseModel } from '../../../../domain/models/purchase'

export interface LoadPurchaseRepository {
  loadAll (cpf: string): Promise<PurchaseModel[]>
}
