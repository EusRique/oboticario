import { Controller } from '../../../../../presentation/protocols'
import { AddPurchaseController } from '../../../../../presentation/controllers/purchase/add-purchase/add-purchase-controller'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeAddPurchaseValidation } from './add-purchase-validation-factory'
import { makeDbAddPurchase } from '../../../usecases/purchase/add-purchase/db-add-purchase-factory'

export const makeAddPurchaseController = (): Controller => {
  const controller = new AddPurchaseController(makeAddPurchaseValidation(), makeDbAddPurchase())
  return makeLogControllerDecorator(controller)
}
