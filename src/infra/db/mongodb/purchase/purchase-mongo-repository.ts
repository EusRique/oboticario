import { AddPurchaseRepository } from '../../../../data/protocols/db/purchase/add-purchase-repository'
import { AddAPurchaseModel } from '../../../../domain/usecases/add-purchase'
import { MongoHelper } from '../helpers/mongo-helper'
import { LoadPurchaseRepository } from '../../../../data/protocols/db/purchase/load-purchase-repository'
import { PurchaseModel } from '../../../../domain/models/purchase'
import { UpdatePurchaseRepository } from '../../../../data/protocols/db/purchase/update-purchase-repository'
import { UpdatePurchaseModel } from '../../../../domain/usecases/update-purchases'
import { ObjectId } from 'mongodb'
import { LoadPurchaseByIdRepository } from '../../../../data/protocols/db/purchase/load-purchase-by-id-repository'
import { RemovePurchaseRepository } from '../../../../data/protocols/db/purchase/remove-purchase-by-id'
import { RemovePurchaseModel } from '../../../../domain/usecases/remove-purchase-by-id'

export class PurchaseMongoRepository implements AddPurchaseRepository, LoadPurchaseRepository, UpdatePurchaseRepository, LoadPurchaseByIdRepository, RemovePurchaseRepository {
  async add (purchaseData: AddAPurchaseModel): Promise<void> {
    const purchaseCollection = await MongoHelper.getCollection('purchases')
    await purchaseCollection.insertOne(purchaseData)
  }

  async loadAll (accountId: string): Promise<PurchaseModel[]> {
    const purchaseCollection = await MongoHelper.getCollection('purchases')
    const purchases: PurchaseModel[] = await purchaseCollection.find({ accountId }).toArray()
    return purchases
  }

  async update (purchaseData: UpdatePurchaseModel): Promise<void> {
    const purchaseCollection = await MongoHelper.getCollection('purchases')
    await purchaseCollection.findOneAndUpdate({
      _id: new ObjectId(purchaseData.purchaseId),
      accountId: purchaseData.accountId
    }, {
      $set: {
        code: purchaseData.code,
        value: purchaseData.value,
        cpf: purchaseData.cpf,
        percentage: purchaseData.percentage,
        cashbackAmount: purchaseData.cashbackAmount,
        status: purchaseData.cpf,
        date: purchaseData.date
      }
    })
  }

  async loadById (id: string): Promise<PurchaseModel> {
    const purchaseCollection = await MongoHelper.getCollection('purchases')
    const purchase = await purchaseCollection.findOne({ _id: new ObjectId(id) })
    return purchase && MongoHelper.map(purchase)
  }

  async remove (data: RemovePurchaseModel): Promise<void> {
    const purchaseCollection = await MongoHelper.getCollection('purchases')
    await purchaseCollection.deleteOne({ _id: data.id })
  }
}
