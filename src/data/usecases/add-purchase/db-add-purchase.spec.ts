import { DbAddPurchase } from './db-add-purchase'
import { AddAPurchaseModel, AddPurchaseRepository } from './db-add-purchase-protocols'

const makeFakePurchaseData = (): AddAPurchaseModel => ({
  code: 'any_code',
  value: 'any_value',
  cpf: 'any_cpf',
  percentage: 'any_percentage',
  cashbackAmount: 'any_cashbackAmount',
  status: 'any_status',
  date: 'any_date'
})

describe('DbPurchase Usecase', () => {
  test('Should call AddPurchaseRepository with corrects values', async () => {
    class AddPurchaseRepositoryStub implements AddPurchaseRepository {
      async add (purchaseData: AddAPurchaseModel): Promise<void> {
        return new Promise(resolve => resolve())
      }
    }
    const addPurchaseRepositoryStub = new AddPurchaseRepositoryStub()
    const addSpy = jest.spyOn(addPurchaseRepositoryStub, 'add')
    const sut = new DbAddPurchase(addPurchaseRepositoryStub)
    const purchaseData = makeFakePurchaseData()
    await sut.add(purchaseData)
    expect(addSpy).toHaveBeenCalledWith(purchaseData)
  })
})
