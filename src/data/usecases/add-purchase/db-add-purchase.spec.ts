import { DbAddPurchase } from './db-add-purchase'
import { AddAPurchaseModel, AddPurchaseRepository } from './db-add-purchase-protocols'
import mockdate from 'mockdate'

const makeFakePurchaseData = (): AddAPurchaseModel => ({
  code: 'any_code',
  value: 0,
  cpf: 'any_cpf',
  percentage: 0,
  cashbackAmount: 0,
  status: 'any_status',
  date: new Date()
})

const makeAddPurchaseRepository = (): AddPurchaseRepository => {
  class AddPurchaseRepositoryStub implements AddPurchaseRepository {
    async add (purchaseData: AddAPurchaseModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddPurchaseRepositoryStub()
}

interface SutTypes {
  sut: DbAddPurchase
  addPurchaseRepositoryStub: AddPurchaseRepository
}
const makeSut = (): SutTypes => {
  const addPurchaseRepositoryStub = makeAddPurchaseRepository()
  const sut = new DbAddPurchase(addPurchaseRepositoryStub)
  return {
    addPurchaseRepositoryStub,
    sut
  }
}

describe('DbPurchase Usecase', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })

  beforeAll(() => {
    mockdate.reset()
  })
  test('Should call AddPurchaseRepository with corrects values', async () => {
    const { sut, addPurchaseRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addPurchaseRepositoryStub, 'add')
    const purchaseData = makeFakePurchaseData()
    await sut.add(purchaseData)
    expect(addSpy).toHaveBeenCalledWith(purchaseData)
  })

  test('Should call AddPurchaseRepository with corrects values', async () => {
    const { sut, addPurchaseRepositoryStub } = makeSut()
    jest.spyOn(addPurchaseRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakePurchaseData())
    await expect(promise).rejects.toThrow()
  })
})
