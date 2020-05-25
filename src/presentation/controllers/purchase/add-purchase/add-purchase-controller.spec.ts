import { HttpRequest } from './add-purchase-controller-protocols'
import { AddPurchaseController } from './add-purchase-controller'
import { Validation } from '../../../protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    code: 'any_value',
    value: 'any_value',
    cpf: 'any_cpf',
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
})
