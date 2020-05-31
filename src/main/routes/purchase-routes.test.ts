import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let purchaseCollection: Collection
let accountCollection: Collection
let updatePurchaseCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Henrique',
    email: 'henrique@gmail.com',
    cpf: '000.000.000-00',
    password: '123'
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

  return accessToken
}
describe('Purchase Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    updatePurchaseCollection = await MongoHelper.getCollection('purchases')
    await updatePurchaseCollection.deleteMany({})
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
      const accessToken = await makeAccessToken()
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

  describe('GET /purchases', () => {
    test('Should return 403 on load purchases with accessToken', async () => {
      await request(app)
        .get('/api/purchases')
        .expect(403)
    })
  })

  describe('PUT /purchases/:purchaseId', () => {
    test('Should return 403 on update purchase result without accessToken', async () => {
      await request(app)
        .put('/api/purchases/:purchaseId')
        .send({
          code: '123',
          value: 100.00,
          cpf: '000.000.000-00',
          percentage: 15,
          cashbackAmount: 10.00,
          status: 'Em validação'
        })
        .expect(403)
    })

    test('Should return 204 on update purchases with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      const res = await updatePurchaseCollection.insertOne({
        code: 'Amanda',
        value: 100.00,
        cpf: '000.000.000-00',
        percentage: 15,
        cashbackAmount: 10.00,
        status: 'Em validação',
        date: new Date()
      })
      await request(app)
        .put(`/api/purchases/${res.ops[0]._id}`)
        .set('x-access-token', accessToken)
        .send({
          code: 'Amanda',
          value: 100.00,
          cpf: '000.000.000-00',
          percentage: 15,
          cashbackAmount: 10.00,
          status: 'Em validação',
          date: new Date()
        })
        .expect(204)
    })
  })

  describe('DELETE /purchases/:purchaseId', () => {
    test('Should return 403 on delete purchase result without accessToken', async () => {
      await request(app)
        .delete('/api/purchases/:purchaseId')
        .send({
          code: '123',
          value: 100.00,
          cpf: '000.000.000-00',
          percentage: 15,
          cashbackAmount: 10.00,
          status: 'Em validação'
        })
        .expect(403)
    })

    test('Should return 204 on delete purchases with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      const res = await updatePurchaseCollection.insertOne({
        code: 'Amanda',
        value: 100.00,
        cpf: '000.000.000-00',
        percentage: 15,
        cashbackAmount: 10.00,
        status: 'Em validação',
        date: new Date()
      })
      await request(app)
        .put(`/api/purchases/${res.ops[0]._id}`)
        .set('x-access-token', accessToken)
        .send({
          code: 'Amanda',
          value: 100.00,
          cpf: '000.000.000-00',
          percentage: 15,
          cashbackAmount: 10.00,
          status: 'Em validação',
          date: new Date()
        })
        .expect(204)
    })
  })
  test('Should return 204 on add loadpurchases with valid accessToken', async () => {
    const accessToken = await makeAccessToken()
    await request(app)
      .get('/api/purchases')
      .set('x-access-token', accessToken)
      .expect(204)
  })
})
