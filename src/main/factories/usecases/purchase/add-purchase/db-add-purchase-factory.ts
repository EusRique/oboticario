import { AddPurchase } from '../../../../../domain/usecases/add-purchase'
import { PurchaseMongoRepository } from '../../../../../infra/db/mongodb/purchase/purchase-mongo-repository'
import { DbAddPurchase } from '../../../../../data/usecases/add-purchase/db-add-purchase'

export const makeDbAddPurchase = (): AddPurchase => {
  const purchaseMongoRepository = new PurchaseMongoRepository()
  return new DbAddPurchase(purchaseMongoRepository)
}
