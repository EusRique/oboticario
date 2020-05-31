import { RemovePurchaseRepository } from '../../protocols/db/purchase/remove-purchase-by-id'
import { RemovePurchase, RemovePurchaseModel } from '../../../domain/usecases/remove-purchase-by-id'

export class DbRemovePurchaseResult implements RemovePurchase {
  constructor (private readonly removePurchaseRepository: RemovePurchaseRepository) {}

  async remove (data: RemovePurchaseModel): Promise<void> {
    await this.removePurchaseRepository.remove(data)
  }
}
