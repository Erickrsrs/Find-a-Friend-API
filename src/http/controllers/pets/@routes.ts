import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { get } from './get'
import { searchByCity } from './search-by-city'
import { filterByAttributes } from './filter-by-attributes'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets/create', { onRequest: [verifyJWT] }, create)

  app.get('/pets/:petId', { onRequest: [verifyJWT] }, get)

  app.get('/pets', { onRequest: [verifyJWT] }, searchByCity)

  app.get('/pets/filter', { onRequest: [verifyJWT] }, filterByAttributes)
}
