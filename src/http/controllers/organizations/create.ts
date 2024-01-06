import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeCreateOrganizationService } from '@/services/factories/make-create-organization-service'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrganizationBodySchema = z.object({
    name: z.string(),
    managerName: z.string(),
    email: z.string().email(),
    cep: z.string().length(8),
    complement: z.string().optional(),
    whatsapp: z.string().length(11),
    password: z.string().min(6).max(42),
  })

  const { name, managerName, email, cep, complement, whatsapp, password } =
    createOrganizationBodySchema.parse(request.body)

  const createOrganizationService = MakeCreateOrganizationService()

  const { organization } = await createOrganizationService.execute({
    name,
    managerName,
    email,
    cep,
    complement,
    whatsapp,
    password,
  })

  return reply.status(201).send({ organization })
}
