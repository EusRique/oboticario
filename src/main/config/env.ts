export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/oboticario',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'JWG!@%$'
}
