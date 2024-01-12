/* eslint-disable camelcase */
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeFilterPetsByAttributesService } from '@/services/factories/make-filter-pets-by-attributes-service'

export async function filterByAttributes(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const filterPetsByAttributesQuerySchema = z.object({
    species: z.string().optional(),
    age: z.enum(['BABY', 'ADULT', 'SENIOR']).optional(),
    size: z.enum(['TINY', 'MEDIUM', 'LARGE']).optional(),
    energy: z.enum(['LOW', 'MODERATE', 'HIGH']).optional(),
    independence_level: z
      .enum(['DEPENDENT', 'INDEPENDENT', 'SELF_SUFFICIENT'])
      .optional(),
  })

  const { species, age, size, energy, independence_level } =
    filterPetsByAttributesQuerySchema.parse(request.query)

  const filterPetsByAttributesService = MakeFilterPetsByAttributesService()

  const { pets } = await filterPetsByAttributesService.execute({
    species,
    age,
    size,
    energy,
    independence_level,
  })

  return reply.status(200).send({ pets })
}
