import { PurchaseController } from './purchase-controller'
import { HttpRequest } from '../../../protocols'
import { AddPurchase, PurchaseModel, AddPurchaseModel } from './purchase-controller-protocols'

const makeAddPurchase = (): AddPurchase => {
  class AddPurchaseStub implements AddPurchase {
    async add (purchase: AddPurchaseModel): Promise<PurchaseModel> {
      return new Promise(resolve => resolve(makeFakePurchase()))
    }
  }
  return new AddPurchaseStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    code: 'any_value',
    value: 'any_value',
    cpf: 'any_cpf',
    date: 'any_date'
  }
})

const makeFakePurchase = (): PurchaseModel => ({
  id: 'valid_id',
  code: 'valid_code',
  value: 'valid_value',
  cpf: 'valid_cpf',
  date: 'valid_date'
})

interface SutTypes {
  sut: PurchaseController
  addPurchaseStub: AddPurchase
}

const makeSut = (): SutTypes => {
  const addPurchaseStub = makeAddPurchase()
  const sut = new PurchaseController(addPurchaseStub)
  return {
    sut,
    addPurchaseStub
  }
}

describe('Purchase Controller', () => {
  test('Should call AddPurchase with correct values', async () => {
    const { sut, addPurchaseStub } = makeSut()
    const addSpy = jest.spyOn(addPurchaseStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      code: 'any_value',
      value: 'any_value',
      cpf: 'any_cpf',
      date: 'any_date'
    })
  })

  test('Should return 400 if no code', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        value: 'any_value',
        cpf: 'any_cpf',
        date: 'any_date'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: code'))
  })

  test('Should return 400 if no value', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        code: 'any_code',
        cpf: 'any_cpf',
        date: 'any_date'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: value'))
  })

  test('Should return 400 if no cpf', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        code: 'any_code',
        value: 'any_value',
        date: 'any_date'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: cpf'))
  })

  test('Should return 400 if no date', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        code: 'any_code',
        value: 'any_value',
        cpf: 'any_cpf'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: date'))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.body).toEqual(makeFakePurchase())
  })
})
