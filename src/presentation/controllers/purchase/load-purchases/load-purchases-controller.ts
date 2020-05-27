import { Controller, HttpRequest, HttpResponse, LoadPurchases } from './load-purchases-controller-protocols'
import { ok, serverError } from '../../../helpers/http/http-helpers'

export class LoadPurchaseController implements Controller {
  constructor (private readonly loadPurchases: LoadPurchases) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const purchases = await this.loadPurchases.load()
      return ok(purchases)
    } catch (error) {
      return serverError(error)
    }
  }
}
