import { UpdatePurchaseModel } from '../../../../domain/usecases/update-purchases'

export interface UpdatePurchaseRepository {
  update (purchaseData: UpdatePurchaseModel): Promise<void>
}
