import { HttpRequest } from './add-purchase-controller-protocols'
import { AddPurchaseController } from './add-purchase-controller'
import { Validation } from '../../../protocols'
import { badRequest } from '../../../helpers/http/http-helpers'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    code: 'any_value',
    value: 'any_value',
    cpf: 'any_cpf',
    percentage: 'any_percentage',
    cashbackAmount: 'any_cashbackAmount',
    status: 'any_status',
    date: 'any_date'
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

interface SutType {
  sut: AddPurchaseController
  validationStub: Validation
}

const makeSut = (): SutType => {
  const validationStub = makeValidation()
  const sut = new AddPurchaseController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('AddSurvey Controller', () => {
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
})
