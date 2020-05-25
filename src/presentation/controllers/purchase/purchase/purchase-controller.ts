import { Controller, HttpResponse, HttpRequest } from '../../../protocols'
import { MissingParamError } from '../../../errors'
import { badRequest, ok } from '../../../helpers/http/http-helpers'
import { AddPurchase } from '../../../../domain/usecases/add-purchase'

export class PurchaseController implements Controller {
  constructor (private readonly addPurchase: AddPurchase) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredField = ['code', 'value', 'cpf', 'date']
    for (const field of requiredField) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const { code, value, cpf, date } = httpRequest.body
    const purchase = await this.addPurchase.add({
      code,
      value,
      cpf,
      date
    })

    return ok(purchase)
  }
}
