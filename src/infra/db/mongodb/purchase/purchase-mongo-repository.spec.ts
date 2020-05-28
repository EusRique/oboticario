import { MongoHelper } from '../helpers/mongo-helper'
import { PurchaseMongoRepository } from './purchase-mongo-repository'
import { Collection } from 'mongodb'

let purchaseCollection: Collection

const makeSut = (): PurchaseMongoRepository => {
  return new PurchaseMongoRepository()
}

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

  describe('Add()', () => {
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

  describe('loadAll()', () => {
    test('Should load all purchase on sucess', async () => {
      await purchaseCollection.insertMany([{
        code: 'any_code',
        value: 0,
        cpf: 'any_cpf',
        percentage: 0,
        cashbackAmount: 0,
        status: 'any_status',
        date: new Date()
      }, {
        code: 'other_code',
        value: 0,
        cpf: 'any_cpf',
        percentage: 0,
        cashbackAmount: 0,
        status: 'other_status',
        date: new Date()
      }])
      const sut = makeSut()
      const purchase = await sut.loadAll('any_cpf')
      expect(purchase.length).toBe(2)
      expect(purchase[0].code).toBe('any_code')
      expect(purchase[1].code).toBe('other_code')
    })

    test('Should load empty list', async () => {
      const sut = makeSut()
      const purchase = await sut.loadAll('any_cpf')
      expect(purchase.length).toBe(0)
    })
  })
})
