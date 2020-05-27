import { LoadPurchaseController } from './load-purchases-controller'
import { PurchaseModel, LoadPurchases } from './load-purchases-controller-protocols'
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

describe('LoadPurchase Controller', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })

  afterAll(() => {
    mockdate.reset()
  })
  test('Should call Purchase', async () => {
    class LoadPurchaseStub implements LoadPurchases {
      async load (): Promise<PurchaseModel[]> {
        return new Promise(resolve => resolve(makeFakePurchases()))
      }
    }
    const loadPurchaseStub = new LoadPurchaseStub()
    const loadSpy = jest.spyOn(loadPurchaseStub, 'load')
    const sut = new LoadPurchaseController(loadPurchaseStub)
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
