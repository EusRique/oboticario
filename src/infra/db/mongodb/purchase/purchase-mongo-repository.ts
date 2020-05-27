import { AddPurchaseRepository } from '../../../../data/protocols/db/purchase/add-purchase-repository'
import { AddAPurchaseModel } from '../../../../domain/usecases/add-purchase'
import { MongoHelper } from '../helpers/mongo-helper'
import { LoadPurchaseRepository } from '../../../../data/protocols/db/purchase/load-purchase-repository'
import { PurchaseModel } from '../../../../domain/models/purchase'

export class PurchaseMongoRepository implements AddPurchaseRepository, LoadPurchaseRepository {
  async add (purchaseData: AddAPurchaseModel): Promise<void> {
    const purchaseCollection = await MongoHelper.getCollection('purchases')
    await purchaseCollection.insertOne(purchaseData)
  }

  async loadAll (): Promise<PurchaseModel[]> {
    const purchaseCollection = await MongoHelper.getCollection('purchases')
    const purchases: PurchaseModel[] = await purchaseCollection.find().toArray()
    return purchases
  }
}
