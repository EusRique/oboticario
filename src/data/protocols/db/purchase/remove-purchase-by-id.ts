import { RemovePurchaseModel } from '../../../../domain/usecases/remove-purchase-by-id'

export interface RemovePurchaseRepository {
  remove (data: RemovePurchaseModel): Promise<void>
}
