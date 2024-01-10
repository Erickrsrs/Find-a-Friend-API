import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { get } from './get'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets/create', { onRequest: [verifyJWT] }, create)

  app.get('/pets/:petId', { onRequest: [verifyJWT] }, get)
}
