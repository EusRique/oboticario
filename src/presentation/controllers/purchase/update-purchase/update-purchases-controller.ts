import { Controller, HttpRequest, HttpResponse } from './update-purchases-controller-protocols'
import { serverError, noContent } from '../../../helpers/http/http-helpers'
import { UpdatePurchase } from '../../../../domain/usecases/update-purchases'

export class UpdatePurchaseController implements Controller {
  constructor (private readonly updatePurchases: UpdatePurchase) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { purchaseId } = httpRequest.params
      const accountId = httpRequest.accountId
      const { code, value, cpf, percentage, cashbackAmount, status } = httpRequest.body
      await this.updatePurchases.update({
        purchaseId,
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
