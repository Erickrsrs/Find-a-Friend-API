/* eslint-disable camelcase */
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeCreatePetService } from '@/services/factories/make-create-pet-service'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    species: z.string(),
    race: z.string().nullable(),
    name: z.string(),
    about: z.string().nullable(),
    age: z.enum(['BABY', 'ADULT', 'SENIOR']),
    size: z.enum(['TINY', 'MEDIUM', 'LARGE']),
    energy: z.enum(['LOW', 'MODERATE', 'HIGH']),
    independence_level: z.enum(['DEPENDENT', 'INDEPENDENT', 'SELF_SUFFICIENT']),
    requirements: z.array(z.string()),
  })

  const {
    species,
    race,
    name,
    about,
    age,
    size,
    energy,
    independence_level,
    requirements,
  } = createPetBodySchema.parse(request.body)

  try {
    const createPetService = MakeCreatePetService()

    const { pet } = await createPetService.execute({
      species,
      race,
      name,
      about,
      age,
      size,
      energy,
      independence_level,
      requirements,
      organization_id: request.user.sub,
    })

    return reply.status(201).send({ pet })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
