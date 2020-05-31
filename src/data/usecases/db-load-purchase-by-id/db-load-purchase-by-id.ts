import { LoadPurchaseById } from '../../../domain/usecases/load-purchase-by-id'
import { LoadPurchaseByIdRepository } from '../../protocols/db/purchase/load-purchase-by-id-repository'
import { PurchaseModel } from '../../../domain/models/purchase'

export class DbLoadPurchaseById implements LoadPurchaseById {
  constructor (private readonly loadPurchaseByIdRepository: LoadPurchaseByIdRepository) {}

  async loadById (id: string): Promise<PurchaseModel> {
    const survey = await this.loadPurchaseByIdRepository.loadById(id)
    return survey
  }
}
