import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddPurchaseController } from '../factories/controllers/purchase/add-purchase/add-purchase-controller-factory'
import { adaptMiddlewares } from '../adapters/express-middlewares-adapter'
import { makeAuthMiddlewares } from '../factories/middlewares/auth-middlewares-factory'

export default (router: Router): void => {
  // Se no makeAddPurchaseController tiver setado admin a rota só será acessivel a users admin
  const auth = adaptMiddlewares(makeAuthMiddlewares())
  router.post('/purchases', auth, adaptRoute(makeAddPurchaseController()))
}
