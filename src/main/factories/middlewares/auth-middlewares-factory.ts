import { Middleware } from '../../../presentation/protocols'
import { AuthMiddleware } from '../../../presentation/middleware/auth-middleware'
import { makeDbLoadAccountByToken } from '../usecases/load-account-by-token/db-load-account-by-token-factory'

export const makeAuthMiddlewares = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
