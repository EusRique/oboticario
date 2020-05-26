import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddPurchaseController } from '../factories/controllers/purchase/add-purchase/add-purchase-controller-factory'
import { adaptMiddlewares } from '../adapters/express-middlewares-adapter'
import { makeAuthMiddlewares } from '../factories/middlewares/auth-middlewares-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddlewares(makeAuthMiddlewares('admin'))
  router.post('/purchases', adminAuth, adaptRoute(makeAddPurchaseController()))
}
