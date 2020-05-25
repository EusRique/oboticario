import { Controller, HttpResponse, HttpRequest } from '../../../protocols'
import { MissingParamError } from '../../../errors'
import { badRequest } from '../../../helpers/http/http-helpers'

export class PurchaseController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredField = ['code', 'value', 'cpf', 'date']
    for (const field of requiredField) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const purchase = {
      body: {
        code: 'any_value',
        value: 'any_value',
        cpf: 'any_cpf',
        date: 'any_date'
      }
    }
    return await {
      statusCode: 200,
      body: purchase
    }
  }
}
