import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeSearchPetsByCityService } from '@/services/factories/make-search-pets-by-city-service'

export async function searchByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchPetsByCityQuerySchema = z.object({
    city: z.string(),
  })

  const { city } = searchPetsByCityQuerySchema.parse(request.query)

  const searchPetsByCityService = MakeSearchPetsByCityService()

  const { pets } = await searchPetsByCityService.execute({ city })

  return reply.status(200).send({ pets })
}
