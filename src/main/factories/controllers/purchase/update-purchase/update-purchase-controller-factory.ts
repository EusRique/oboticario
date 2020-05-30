import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbUpdatePurchase } from '../../../usecases/purchase/update-purchase/db-update-purchase'
import { UpdatePurchaseController } from '../../../../../presentation/controllers/purchase/update-purchase/update-purchases-controller'

export const makeUpdatePurchaseController = (): Controller => {
  const controller = new UpdatePurchaseController(makeDbUpdatePurchase())
  return makeLogControllerDecorator(controller)
}
