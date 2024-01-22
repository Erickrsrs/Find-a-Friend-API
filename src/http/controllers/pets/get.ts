import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeGetPetDetailsService } from '@/services/factories/make-get-pet-details-service'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found-error'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const getPetParamsSchema = z.object({
    petId: z.string(),
  })

  const { petId } = getPetParamsSchema.parse(request.params)

  try {
    const getPetDetailsService = MakeGetPetDetailsService()

    const { pet, organization, address } = await getPetDetailsService.execute({
      petId,
    })

    return reply.status(200).send({
      pet,
      organization: {
        ...organization,
        password_hash: undefined,
      },
      address,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
