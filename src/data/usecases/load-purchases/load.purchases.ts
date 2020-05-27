import { LoadPurchases } from '../../../domain/usecases/load-purchases'
import { PurchaseModel } from '../../../domain/models/purchase'
import { LoadPurchaseRepository } from '../../protocols/db/purchase/load-purchase-repository'

export class DbLoadPurchases implements LoadPurchases {
  constructor (private readonly loadPurchasesRepository: LoadPurchaseRepository) {}

  async load (): Promise<PurchaseModel[]> {
    await this.loadPurchasesRepository.loadAll()
    return []
  }
}
