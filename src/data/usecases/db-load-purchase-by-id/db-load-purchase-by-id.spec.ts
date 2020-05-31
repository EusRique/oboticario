import mockdate from 'mockdate'
import { DbLoadPurchaseById } from '../../../data/usecases/db-load-purchase-by-id/db-load-purchase-by-id'
import { LoadPurchaseByIdRepository } from '../../protocols/db/purchase/load-purchase-by-id-repository'
import { PurchaseModel } from '../../../domain/models/purchase'

const makeFakePurchase = (): PurchaseModel => {
  return {
    id: 'any_id',
    accountId: 'any_string',
    code: 'any_value',
    value: 100,
    cpf: 'any_cpf',
    percentage: 10,
    cashbackAmount: 10,
    status: 'any_status',
    date: new Date()
  }
}

const makeLoadPurchasesByIdRepository = (): LoadPurchaseByIdRepository => {
  class LoadPurchaseByIdRepositoryStub implements LoadPurchaseByIdRepository {
    async loadById (id: string): Promise<PurchaseModel> {
      return new Promise(resolve => resolve(makeFakePurchase()))
    }
  }
  return new LoadPurchaseByIdRepositoryStub()
}

interface SutTypes {
  sut: DbLoadPurchaseById
  loadPurchasesByIdRepositoryStub: LoadPurchaseByIdRepository
}
const makeSut = (): SutTypes => {
  const loadPurchasesByIdRepositoryStub = makeLoadPurchasesByIdRepository()
  const sut = new DbLoadPurchaseById(loadPurchasesByIdRepositoryStub)

  return {
    sut,
    loadPurchasesByIdRepositoryStub
  }
}

describe('DbLoadPurchaseByid Usecase', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })

  beforeAll(() => {
    mockdate.reset()
  })
  test('Should call LoadPurcaseById', async () => {
    const { sut, loadPurchasesByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadPurchasesByIdRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if LoadPurchasesByIdRepository throws', async () => {
    const { sut, loadPurchasesByIdRepositoryStub } = makeSut()
    jest.spyOn(loadPurchasesByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.loadById('any_cpf')
    await expect(promise).rejects.toThrow()
  })

  test('Should return a list of Purchases on success', async () => {
    const { sut } = makeSut()
    const purchases = await sut.loadById('any_cpf')
    expect(purchases).toEqual(makeFakePurchase())
  })
})
