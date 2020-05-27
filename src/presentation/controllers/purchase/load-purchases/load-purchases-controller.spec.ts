import { LoadPurchaseController } from './load-purchases-controller'
import { PurchaseModel, LoadPurchases } from './load-purchases-controller-protocols'
import { ok } from '../../../helpers/http/http-helpers'
import mockdate from 'mockdate'

const makeFakePurchases = (): PurchaseModel[] => {
  return [{
    id: 'any_id',
    code: 'any_value',
    value: 100,
    cpf: 'any_cpf',
    percentage: 10,
    cashbackAmount: 10,
    status: 'any_status',
    date: new Date()
  }, {
    id: 'any_id',
    code: 'any_value',
    value: 200,
    cpf: 'any_cpf',
    percentage: 20,
    cashbackAmount: 20,
    status: 'any_status',
    date: new Date()
  }]
}

interface SutTypes {
  sut: LoadPurchaseController
  loadPurchasesStub: LoadPurchases
}

const makeLoadPurchases = (): LoadPurchases => {
  class LoadPurchasesStub implements LoadPurchases {
    async load (): Promise<PurchaseModel[]> {
      return new Promise(resolve => resolve(makeFakePurchases()))
    }
  }
  return new LoadPurchasesStub()
}

const makeSut = (): SutTypes => {
  const loadPurchasesStub = makeLoadPurchases()
  const sut = new LoadPurchaseController(loadPurchasesStub)
  return {
    sut,
    loadPurchasesStub
  }
}

describe('LoadPurchase Controller', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })

  afterAll(() => {
    mockdate.reset()
  })
  test('Should call Purchase', async () => {
    const { sut, loadPurchasesStub } = makeSut()
    const loadSpy = jest.spyOn(loadPurchasesStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return  200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakePurchases()))
  })
})
