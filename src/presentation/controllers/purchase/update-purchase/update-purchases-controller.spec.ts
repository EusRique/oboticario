import mockdate from 'mockdate'
import { UpdatePurchaseController } from './update-purchases-controller'
import { HttpRequest, Validation } from '../../../protocols'
import { UpdatePurchase, UpdatePurchaseModel } from '../../../../domain/usecases/update-purchases'
import { badRequest, serverError, noContent } from '../../../helpers/http/http-helpers'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    code: 'any_code',
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

const makeUpdatePurchase = (): UpdatePurchase => {
  class UpdatePurchaseStub implements UpdatePurchase {
    async update (data: UpdatePurchaseModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new UpdatePurchaseStub()
}

interface SutType {
  sut: UpdatePurchaseController
  validationStub: Validation
  updatePurchaseStub: UpdatePurchase
}

const makeSut = (): SutType => {
  const validationStub = makeValidation()
  const updatePurchaseStub = makeUpdatePurchase()
  const sut = new UpdatePurchaseController(validationStub, updatePurchaseStub)
  return {
    sut,
    validationStub,
    updatePurchaseStub
  }
}
describe('UpdatePurchase Controller', () => {
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

  test('Should call UpdatePurchase with correct values ', async () => {
    const { sut, updatePurchaseStub } = makeSut()
    const updateSpy = jest.spyOn(updatePurchaseStub, 'update')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(updateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if UpdatePurchase throws', async () => {
    const { sut, updatePurchaseStub } = makeSut()
    jest.spyOn(updatePurchaseStub, 'update').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
