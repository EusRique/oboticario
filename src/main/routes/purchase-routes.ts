import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddPurchaseController } from '../factories/controllers/purchase/add-purchase/add-purchase-controller-factory'
import { makeLoadPurchaseController } from '../factories/controllers/purchase/load-purchase/load-purchase-controller-factory'
import { auth } from '../middlewares/auth'
// import { adminAuth } from '../middlewares/admin-auth'

export default (router: Router): void => {
  // Se no makeAddPurchaseController tiver setado admin a rota só será acessivel a users admin
  router.post('/purchases', auth, adaptRoute(makeAddPurchaseController()))
  router.get('/purchases', auth, adaptRoute(makeLoadPurchaseController()))
}
