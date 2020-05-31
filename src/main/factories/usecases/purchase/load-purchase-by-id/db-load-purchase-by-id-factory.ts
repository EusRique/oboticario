import { LoadPurchaseById } from '../../../../../domain/usecases/load-purchase-by-id'
import { PurchaseMongoRepository } from '../../../../../infra/db/mongodb/purchase/purchase-mongo-repository'
import { DbLoadPurchaseById } from '../../../../../data/usecases/db-load-purchase-by-id/db-load-purchase-by-id'

export const makeDbLoadPurchaseById = (): LoadPurchaseById => {
  const surveyMongoRepository = new PurchaseMongoRepository()
  return new DbLoadPurchaseById(surveyMongoRepository)
}
