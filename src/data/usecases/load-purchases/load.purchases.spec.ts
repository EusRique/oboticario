import { LoadPurchaseRepository } from '../../protocols/db/purchase/load-purchase-repository'
import { PurchaseModel } from '../../../domain/models/purchase'
import { DbLoadPurchases } from './load.purchases'

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

describe('DbLoadPurchases', () => {
  test('Should call LoadPurchasesRepository', async () => {
    class LoadPurchasesRepositoryStub implements LoadPurchaseRepository {
      async loadAll (): Promise<PurchaseModel[]> {
        return new Promise(resolve => resolve(makeFakePurchases()))
      }
    }
    const loadPurchasesRepositoryStub = new LoadPurchasesRepositoryStub()
    const loadAllSpy = jest.spyOn(loadPurchasesRepositoryStub, 'loadAll')
    const sut = new DbLoadPurchases(loadPurchasesRepositoryStub)
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
