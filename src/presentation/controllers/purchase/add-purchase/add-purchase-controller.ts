import { Controller, HttpRequest, HttpResponse } from './add-purchase-controller-protocols'
import { Validation } from '../../../protocols'

export class AddPurchaseController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return new Promise(resolve => resolve(null))
  }
}
