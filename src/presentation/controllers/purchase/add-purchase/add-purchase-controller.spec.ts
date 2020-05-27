import { HttpRequest, Validation, AddPurchase, AddAPurchaseModel } from './add-purchase-controller-protocols'
import { AddPurchaseController } from './add-purchase-controller'
import { badRequest, serverError, noContent } from '../../../helpers/http/http-helpers'
import mockdate from 'mockdate'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    code: 'any_value',
    value: 10,
    cpf: 'any_cpf',
    percentage: 10,
    cashbackAmount: 10,
    status: 'any_status',
    date: new Date()
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddPurchase = (): AddPurchase => {
  class AddPurchaseStub implements AddPurchase {
    async add (data: AddAPurchaseModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddPurchaseStub()
}

interface SutType {
  sut: AddPurchaseController
  validationStub: Validation
  addPurchaseStub: AddPurchase
}

const makeSut = (): SutType => {
  const validationStub = makeValidation()
  const addPurchaseStub = makeAddPurchase()
  const sut = new AddPurchaseController(validationStub, addPurchaseStub)
  return {
    sut,
    validationStub,
    addPurchaseStub
  }
}

describe('AddSurvey Controller', () => {
  beforeAll(() => {
    mockdate.set(new Date())
  })

  afterAll(() => {
    mockdate.reset()
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddPurchase with correct values', async () => {
    const { sut, addPurchaseStub } = makeSut()
    const addSpy = jest.spyOn(addPurchaseStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if AddPurchase throws', async () => {
    const { sut, addPurchaseStub } = makeSut()
    jest.spyOn(addPurchaseStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
