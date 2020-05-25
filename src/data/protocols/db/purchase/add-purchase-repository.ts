import { AddAPurchaseModel } from '../../../../domain/usecases/add-purchase'

export interface AddPurchaseRepository {
  add (purchaseData: AddAPurchaseModel): Promise<void>
}
