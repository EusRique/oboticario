import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { LoadPurchaseById } from '../../../../domain/usecases/load-purchase-by-id'
import { RemovePurchase } from '../../../../domain/usecases/remove-purchase-by-id'
import { forbidden, noContent, serverError } from '../../../helpers/http/http-helpers'
import { InvalidParamError, RemovePurchaseError } from '../../../errors'

export class RemovePurchaseController implements Controller {
  constructor (
    private readonly loadPurchaseById: LoadPurchaseById,
    private readonly removePurchase: RemovePurchase
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { purchaseId } = httpRequest.params
      const purchase = await this.loadPurchaseById.loadById(purchaseId)

      if (!purchase) {
        return forbidden(new InvalidParamError('purchaseId'))
      }
      if (purchase.status === 'Aprovado') {
        return forbidden(new RemovePurchaseError())
      }
      await this.removePurchase.remove(purchase)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
