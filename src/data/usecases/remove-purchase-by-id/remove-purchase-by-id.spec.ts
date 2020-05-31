import { RemovePurchaseModel } from '../../../domain/usecases/remove-purchase-by-id'
import { DbRemovePurchaseResult } from './remove-purchase-by-id'
import { RemovePurchaseRepository } from '../../../data/protocols/db/purchase/remove-purchase-by-id'
import mockdate from 'mockdate'

const makeFakePurchaseData = (): RemovePurchaseModel => ({
  id: 'any_id',
  accountId: 'any_purchaseId',
  code: 'any_code',
  value: 0,
  cpf: 'any_cpf',
  percentage: 0,
  cashbackAmount: 0,
  status: 'any_status',
  date: new Date()
})

const makeUpdatePurchaseRepository = (): RemovePurchaseRepository => {
  class RemovePurchaseRepositoryStub implements RemovePurchaseRepository {
    async remove (purchaseData: RemovePurchaseModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new RemovePurchaseRepositoryStub()
}

interface SutTypes {
  sut: DbRemovePurchaseResult
  removePurchaseRepositoryStub: RemovePurchaseRepository
}
const makeSut = (): SutTypes => {
  const removePurchaseRepositoryStub = makeUpdatePurchaseRepository()
  const sut = new DbRemovePurchaseResult(removePurchaseRepositoryStub)
  return {
    removePurchaseRepositoryStub,
    sut
  }
}

describe('DbRemovePurchase Usecase', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })

  beforeAll(() => {
    mockdate.reset()
  })
  test('Should call RemovePurchaseRepository with corrects values', async () => {
    const { sut, removePurchaseRepositoryStub } = makeSut()
    const removeSpy = jest.spyOn(removePurchaseRepositoryStub, 'remove')
    const purchaseData = makeFakePurchaseData()
    await sut.remove(purchaseData)
    expect(removeSpy).toHaveBeenCalledWith(purchaseData)
  })

  test('Should throw if RemovePurchaseRepository throws', async () => {
    const { sut, removePurchaseRepositoryStub } = makeSut()
    jest.spyOn(removePurchaseRepositoryStub, 'remove').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.remove(makeFakePurchaseData())
    await expect(promise).rejects.toThrow()
  })
})
