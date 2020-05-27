import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let purchaseCollection: Collection
let accountCollection: Collection

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
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /purchases', () => {
    test('Should return 403 on add purchases with accessToken', async () => {
      await request(app)
        .post('/api/purchases')
        .send({
          code: 'Amanda',
          value: 100.00,
          cpf: '000.000.000-00',
          percentage: 15,
          cashbackAmount: 10.00,
          status: 'Em validação'
        })
        .expect(403)
    })

    test('Should return 204 on add purchases with valid accessToken', async () => {
      const res = await accountCollection.insertOne({
        name: 'Henrique',
        email: 'henrique@gmail.com',
        cpf: '000.000.000-00',
        password: '123',
        role: 'admin'
      })
      const id = res.ops[0]._id
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: id
      }, {
        $set: {
          accessToken
        }
      })
      await request(app)
        .post('/api/purchases')
        .set('x-access-token', accessToken)
        .send({
          code: 'Amanda',
          value: 100.00,
          cpf: '000.000.000-00',
          percentage: 15,
          cashbackAmount: 10.00,
          status: 'Em validação'
        })
        .expect(204)
    })
  })
})
