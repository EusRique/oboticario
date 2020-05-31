import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbRemovePurchase } from '../../../usecases/purchase/remove-purchase/db-remove-purchase'
import { RemovePurchaseController } from '../../../../../presentation/controllers/purchase/remove/remove-purchase-controller'
import { makeDbLoadPurchaseById } from '../../../usecases/purchase/load-purchase-by-id/db-load-purchase-by-id-factory'

export const makeRemovePurchaseController = (): Controller => {
  const controller = new RemovePurchaseController(makeDbLoadPurchaseById(), makeDbRemovePurchase())
  return makeLogControllerDecorator(controller)
}
