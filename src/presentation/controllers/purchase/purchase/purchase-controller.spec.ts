import { PurchaseController } from './purchase-controller'

interface SutTypes {
  sut: PurchaseController
}

const makeSut = (): SutTypes => {
  const sut = new PurchaseController()
  return {
    sut
  }
}

describe('Purchase Controller', () => {
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
})
