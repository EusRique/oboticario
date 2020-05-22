import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Henrique',
        email: 'henrique@gmail.com',
        cpf: '000.000.000-00',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
