import { PurchaseMongoRepository } from '../../../../../infra/db/mongodb/purchase/purchase-mongo-repository'
import { DbUpdatePurchases } from '../../../../../data/usecases/update-purchase/db-update.purchases'
import { UpdatePurchase } from '../../../../../domain/usecases/update-purchases'

export const makeDbUpdatePurchase = (): UpdatePurchase => {
  const purchaseMongoRepository = new PurchaseMongoRepository()
  return new DbUpdatePurchases(purchaseMongoRepository)
}
