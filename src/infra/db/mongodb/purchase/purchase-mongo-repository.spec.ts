import { PurchaseMongoRepository } from './purchase-mongo-repository'
import { PurchaseModel } from '../../../../domain/models/purchase'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'

const mockPurchases = (): PurchaseModel => {
  return {
    id: 'any_id',
    accountId: 'any_accountId',
    code: 'any_code',
    value: 100,
    cpf: 'any_cpf',
    percentage: 10,
    cashbackAmount: 10,
    status: 'any_status',
    date: new Date()
  }
}

let surveyCollection: Collection

describe('PurchaseMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('purchases')
    await surveyCollection.deleteMany({})
  })

  const makeSut = (): PurchaseMongoRepository => {
    return new PurchaseMongoRepository()
  }

  describe('add()', () => {
    test('Should return an purchase on add sucess', async () => {
      const sut = makeSut()
      await sut.add(mockPurchases())
      const count = await surveyCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('loadById()', () => {
    test('Should load purchase by id on success', async () => {
      const res = await surveyCollection.insertOne(mockPurchases())
      const sut = makeSut()
      const purchase = await sut.loadById(res.ops[0]._id)
      expect(purchase).toBeTruthy()
      expect(purchase.id).toBeTruthy()
    })
  })

  describe('remove()', () => {
    test('Remove an purchase sucess', async () => {
      const res = await surveyCollection.insertOne(mockPurchases())
      const sut = makeSut()
      const purchase = await sut.loadById(res.ops[0]._id)
      await sut.remove(purchase)
      const count = await surveyCollection.countDocuments()
      expect(count).toBe(0)
    })
  })
})
