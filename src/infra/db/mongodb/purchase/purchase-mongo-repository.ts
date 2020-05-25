import { AddPurchaseRepository } from '../../../../data/protocols/db/purchase/add-purchase-repository'
import { AddAPurchaseModel } from '../../../../domain/usecases/add-purchase'
import { MongoHelper } from '../helpers/mongo-helper'

export class PurchaseMongoRepository implements AddPurchaseRepository {
  async add (purchaseData: AddAPurchaseModel): Promise<void> {
    const purchaseCollection = await MongoHelper.getCollection('purchases')
    await purchaseCollection.insertOne(purchaseData)
  }
}
