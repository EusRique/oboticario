import { Controller, HttpRequest, HttpResponse, Validation, AddPurchase } from './add-purchase-controller-protocols'
import { badRequest } from '../../../helpers/http/http-helpers'

export class AddPurchaseController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addPurchase: AddPurchase
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    const { code, value, cpf, percentage, cashbackAmount, status, date } = httpRequest.body
    await this.addPurchase.add({
      code,
      value,
      cpf,
      percentage,
      cashbackAmount,
      status,
      date
    })
    return null
  }
}
