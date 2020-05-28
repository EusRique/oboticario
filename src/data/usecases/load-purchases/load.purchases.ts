import { LoadPurchases } from '../../../domain/usecases/load-purchases'
import { PurchaseModel } from '../../../domain/models/purchase'
import { LoadPurchaseRepository } from '../../protocols/db/purchase/load-purchase-repository'

export class DbLoadPurchases implements LoadPurchases {
  constructor (private readonly loadPurchasesRepository: LoadPurchaseRepository) {}

  async load (cpf: string): Promise<PurchaseModel[]> {
    const purchases = await this.loadPurchasesRepository.loadAll(cpf)
    return purchases
  }
}
