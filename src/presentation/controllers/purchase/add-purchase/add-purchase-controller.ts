import { Controller, HttpRequest, HttpResponse, Validation, AddPurchase } from './add-purchase-controller-protocols'
import { badRequest, serverError, noContent } from '../../../helpers/http/http-helpers'

export class AddPurchaseController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addPurchase: AddPurchase
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const accountId = httpRequest.accountId
      const { code, value, cpf, percentage, cashbackAmount, status } = httpRequest.body
      await this.addPurchase.add({
        accountId,
        code,
        value,
        cpf,
        percentage,
        cashbackAmount,
        status,
        date: new Date()
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
