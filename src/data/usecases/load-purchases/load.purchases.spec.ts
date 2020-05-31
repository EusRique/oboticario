import { LoadPurchaseRepository } from '../../protocols/db/purchase/load-purchase-repository'
import { PurchaseModel } from '../../../domain/models/purchase'
import { DbLoadPurchases } from './load.purchases'
import mockdate from 'mockdate'

const makeFakePurchases = (): PurchaseModel[] => {
  return [{
    id: 'any_id',
    accountId: 'any_string',
    code: 'any_value',
    value: 100,
    cpf: 'any_cpf',
    percentage: 10,
    cashbackAmount: 10,
    status: 'any_status',
    date: new Date()
  }, {
    id: 'any_id',
    accountId: 'any_string',
    code: 'any_value',
    value: 200,
    cpf: 'any_cpf',
    percentage: 20,
    cashbackAmount: 20,
    status: 'any_status',
    date: new Date()
  }]
}

const makeLoadPurchasesRepository = (): LoadPurchaseRepository => {
  class LoadPurchasesRepositoryStub implements LoadPurchaseRepository {
    async loadAll (): Promise<PurchaseModel[]> {
      return new Promise(resolve => resolve(makeFakePurchases()))
    }
  }
  return new LoadPurchasesRepositoryStub()
}

interface SutTypes {
  sut: DbLoadPurchases
  loadPurchasesRepositoryStub: LoadPurchaseRepository
}
const makeSut = (): SutTypes => {
  const loadPurchasesRepositoryStub = makeLoadPurchasesRepository()
  const sut = new DbLoadPurchases(loadPurchasesRepositoryStub)

  return {
    sut,
    loadPurchasesRepositoryStub
  }
}

describe('DbLoadPurchases', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })

  afterAll(() => {
    mockdate.reset()
  })
  test('Should call LoadPurchasesRepository', async () => {
    const { sut, loadPurchasesRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadPurchasesRepositoryStub, 'loadAll')
    await sut.load('any_cpf')
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a list of Purchases on success', async () => {
    const { sut } = makeSut()
    const purchases = await sut.load('any_cpf')
    expect(purchases).toEqual(makeFakePurchases())
  })

  test('Should throw if LoadPurchasesRepository throws', async () => {
    const { sut, loadPurchasesRepositoryStub } = makeSut()
    jest.spyOn(loadPurchasesRepositoryStub, 'loadAll').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load('any_cpf')
    await expect(promise).rejects.toThrow()
  })
})
