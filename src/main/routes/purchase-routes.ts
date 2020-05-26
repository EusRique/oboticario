import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddPurchaseController } from '../factories/controllers/purchase/add-purchase/add-purchase-controller-factory'

export default (router: Router): void => {
  router.post('/purchases', adaptRoute(makeAddPurchaseController()))
}
