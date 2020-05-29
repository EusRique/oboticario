import { Controller, HttpRequest, HttpResponse, LoadPurchases } from './load-purchases-controller-protocols'
import { ok, serverError, noContent } from '../../../helpers/http/http-helpers'

export class LoadPurchaseController implements Controller {
  constructor (private readonly loadPurchases: LoadPurchases) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accountId = httpRequest.accountId
      const purchases = await this.loadPurchases.load(accountId)
      return purchases.length ? ok(purchases) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
