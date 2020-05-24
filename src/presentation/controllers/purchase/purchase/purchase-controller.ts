import { Controller, HttpResponse, HttpRequest } from '../../../protocols'
import { MissingParamError } from '../../../errors'
import { badRequest } from '../../../helpers/http/http-helpers'

export class PurchaseController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredField = ['code', 'value', 'cpf', 'date']
    for (const field of requiredField) {
      if (!httpRequest.body[field]) {
        return await badRequest(new MissingParamError(field))
      }
    }
  }
}
