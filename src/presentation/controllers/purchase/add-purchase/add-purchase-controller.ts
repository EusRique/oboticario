import { Controller, HttpRequest, HttpResponse } from './add-purchase-controller-protocols'
import { Validation } from '../../../protocols'
import { badRequest } from '../../../helpers/http/http-helpers'

export class AddPurchaseController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    return new Promise(resolve => resolve(null))
  }
}
