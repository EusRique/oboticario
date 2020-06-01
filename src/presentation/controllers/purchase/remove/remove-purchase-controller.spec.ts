import { RemovePurchaseController } from './remove-purchase-controller'
import { LoadPurchaseById, PurchaseModel, HttpRequest } from './remove-purchases-controller-protocols'
import { forbidden, serverError, noContent } from '../../../helpers/http/http-helpers'
import { InvalidParamError } from '../../../errors'
import { RemovePurchase, RemovePurchaseModel } from '../../../../domain/usecases/remove-purchase-by-id'
import MockDate from 'mockdate'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    purchaseId: 'any_purchaseId'
  }
})

const makeFakePurchase = (): PurchaseModel => ({
  id: 'any_id',
  accountId: 'any_id',
  code: 'any_value',
  value: 100,
  cpf: 'any_cpf',
  percentage: 10,
  cashbackAmount: 10,
  status: 'any_status',
  date: new Date()
})

const makeLoadPurchaseById = (): LoadPurchaseById => {
  class LoadPurchaseByIdStub implements LoadPurchaseById {
    async loadById (id: string): Promise<PurchaseModel> {
      return new Promise(resolve => resolve(makeFakePurchase()))
    }
  }
  return new LoadPurchaseByIdStub()
}

const makeRemovePurchase = (): RemovePurchase => {
  class RemovePurchaseStub implements RemovePurchase {
    async remove (data: RemovePurchaseModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new RemovePurchaseStub()
}

interface SutTypes {
  sut: RemovePurchaseController
  loadPurchaseByIdStub: LoadPurchaseById
  removedPurchaseStub: RemovePurchase
}

const makeSut = (): SutTypes => {
  const loadPurchaseByIdStub = makeLoadPurchaseById()
  const removedPurchaseStub = makeRemovePurchase()
  const sut = new RemovePurchaseController(loadPurchaseByIdStub, removedPurchaseStub)
  return {
    sut,
    loadPurchaseByIdStub,
    removedPurchaseStub
  }
}

describe('RemovePurchase Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadPurchaseById with correct values', async () => {
    const { sut, loadPurchaseByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadPurchaseByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_purchaseId')
  })

  test('Should return 403 if LoadPurchaseById returns null', async () => {
    const { sut, loadPurchaseByIdStub } = makeSut()
    jest.spyOn(loadPurchaseByIdStub, 'loadById').mockResolvedValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('purchaseId')))
  })

  test('Should return 500 if LoadPurchaseById throws', async () => {
    const { sut, loadPurchaseByIdStub } = makeSut()
    jest.spyOn(loadPurchaseByIdStub, 'loadById').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call RemovedPurchaseById with correct values', async () => {
    const { sut, removedPurchaseStub } = makeSut()
    const removeSpy = jest.spyOn(removedPurchaseStub, 'remove')
    await sut.handle(makeFakeRequest())
    expect(removeSpy).toHaveBeenCalledWith({
      id: 'any_id',
      accountId: 'any_id',
      code: 'any_value',
      value: 100,
      cpf: 'any_cpf',
      percentage: 10,
      cashbackAmount: 10,
      status: 'any_status',
      date: new Date()
    })
  })

  test('Should return 500 if RemovedPurchaseById throws', async () => {
    const { sut, removedPurchaseStub } = makeSut()
    jest.spyOn(removedPurchaseStub, 'remove').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success ', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
