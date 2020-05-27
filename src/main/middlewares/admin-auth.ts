import { adaptMiddlewares } from '../adapters/express-middlewares-adapter'
import { makeAuthMiddlewares } from '../factories/middlewares/auth-middlewares-factory'

export const adminAuth = adaptMiddlewares(makeAuthMiddlewares())
