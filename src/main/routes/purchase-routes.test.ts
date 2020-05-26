import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let purchaseCollection: Collection

describe('Purchase Routes', () => {
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

  describe('POST /purchases', () => {
    test('Should return 403 on add purchases with accessToken', async () => {
      await request(app)
        .post('/api/purchases')
        .send({
          code: 'Amanda',
          value: '100.00',
          cpf: '000.000.000-00',
          percentage: '15',
          cashbackAmount: '10.00',
          status: 'Em validação',
          date: '2020-05-25'
        })
        .expect(403)
    })
  })
})
