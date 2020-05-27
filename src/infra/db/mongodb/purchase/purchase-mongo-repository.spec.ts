import { MongoHelper } from '../helpers/mongo-helper'
import { PurchaseMongoRepository } from './purchase-mongo-repository'
import { Collection } from 'mongodb'

let purchaseCollection: Collection
describe('Purchase Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    purchaseCollection = await MongoHelper.getCollection('purchases')
    await purchaseCollection.deleteMany({})
  })

  const makeSut = (): PurchaseMongoRepository => {
    return new PurchaseMongoRepository()
  }

  test('Should add a purchase on sucess', async () => {
    const sut = makeSut()
    await sut.add({
      code: 'any_code',
      value: 0,
      cpf: 'any_cpf',
      percentage: 0,
      cashbackAmount: 0,
      status: 'any_status',
      date: new Date()
    })
    const purchase = await purchaseCollection.findOne({ code: 'any_code' })
    expect(purchase).toBeTruthy()
  })
})
