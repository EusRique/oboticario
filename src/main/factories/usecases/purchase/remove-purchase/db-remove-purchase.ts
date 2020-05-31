import { PurchaseMongoRepository } from '../../../../../infra/db/mongodb/purchase/purchase-mongo-repository'
import { RemovePurchase } from '../../../../../domain/usecases/remove-purchase-by-id'
import { DbRemovePurchaseResult } from '../../../../../data/usecases/remove-purchase-by-id/remove-purchase-by-id'

export const makeDbRemovePurchase = (): RemovePurchase => {
  const purchaseMongoRepository = new PurchaseMongoRepository()
  return new DbRemovePurchaseResult(purchaseMongoRepository)
}
