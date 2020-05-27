import { Controller, HttpRequest, HttpResponse, LoadPurchases } from './load-purchases-controller-protocols'

export class LoadPurchaseController implements Controller {
  constructor (private readonly loadPurchases: LoadPurchases) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadPurchases.load()
    return null
  }
}
