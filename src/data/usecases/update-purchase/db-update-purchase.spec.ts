import { DbUpdatePurchases } from './db-update.purchases'
import { UpdatePurchaseModel, UpdatePurchaseRepository } from './db-update-purchase-protocols'
import mockdate from 'mockdate'

const makeFakePurchaseData = (): UpdatePurchaseModel => ({
  purchaseId: 'any_purchaseId',
  accountId: 'any_purchaseId',
  code: 'any_code',
  value: 0,
  cpf: 'any_cpf',
  percentage: 0,
  cashbackAmount: 0,
  status: 'any_status',
  date: new Date()
})

const makeUpdatePurchaseRepository = (): UpdatePurchaseRepository => {
  class UpdatePurchaseRepositoryStub implements UpdatePurchaseRepository {
    async update (purchaseData: UpdatePurchaseModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new UpdatePurchaseRepositoryStub()
}

interface SutTypes {
  sut: DbUpdatePurchases
  updatePurchaseRepositoryStub: UpdatePurchaseRepository
}
const makeSut = (): SutTypes => {
  const updatePurchaseRepositoryStub = makeUpdatePurchaseRepository()
  const sut = new DbUpdatePurchases(updatePurchaseRepositoryStub)
  return {
    updatePurchaseRepositoryStub,
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
  test('Should call UpdatePurchaseRepository with corrects values', async () => {
    const { sut, updatePurchaseRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(updatePurchaseRepositoryStub, 'update')
    const purchaseData = makeFakePurchaseData()
    await sut.update(purchaseData)
    expect(addSpy).toHaveBeenCalledWith(purchaseData)
  })

  test('Should call UpdatePurchaseRepository with corrects values', async () => {
    const { sut, updatePurchaseRepositoryStub } = makeSut()
    jest.spyOn(updatePurchaseRepositoryStub, 'update').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.update(makeFakePurchaseData())
    await expect(promise).rejects.toThrow()
  })
})
