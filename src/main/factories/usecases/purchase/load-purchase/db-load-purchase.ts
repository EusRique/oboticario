import { PurchaseMongoRepository } from '../../../../../infra/db/mongodb/purchase/purchase-mongo-repository'
import { LoadPurchases } from '../../../../../domain/usecases/load-purchases'
import { DbLoadPurchases } from '../../../../../data/usecases/load-purchases/load.purchases'

export const makeDbLoadPurchase = (): LoadPurchases => {
  const purchaseMongoRepository = new PurchaseMongoRepository()
  return new DbLoadPurchases(purchaseMongoRepository)
}
