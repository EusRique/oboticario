import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddPurchaseController } from '../factories/controllers/add-purchase/add-purchase-controller-factory'

export default (router: Router): void => {
  router.post('/purchases', adaptRoute(makeAddPurchaseController()))
}
