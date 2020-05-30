import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbUpdatePurchase } from '../../../usecases/purchase/update-purchase/db-update-purchase'
import { UpdatePurchaseController } from '../../../../../presentation/controllers/purchase/update-purchase/update-purchases-controller'
import { makeUpdatePurchaseValidation } from './update-purchase-validation-factory'

export const makeUpdatePurchaseController = (): Controller => {
  const controller = new UpdatePurchaseController(makeUpdatePurchaseValidation(), makeDbUpdatePurchase())
  return makeLogControllerDecorator(controller)
}
