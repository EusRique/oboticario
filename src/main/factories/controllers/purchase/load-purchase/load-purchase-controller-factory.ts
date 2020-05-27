import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { LoadPurchaseController } from '../../../../../presentation/controllers/purchase/load-purchases/load-purchases-controller'
import { makeDbLoadPurchase } from '../../../usecases/purchase/load-purchase/db-load-purchase'

export const makeLoadPurchaseController = (): Controller => {
  const controller = new LoadPurchaseController(makeDbLoadPurchase())
  return makeLogControllerDecorator(controller)
}
