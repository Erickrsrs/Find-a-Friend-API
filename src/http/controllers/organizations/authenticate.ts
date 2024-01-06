import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateOrganizationService } from '@/services/factories/make-authenticate-organization-service'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateOrganizationBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(42),
  })

  const { email, password } = authenticateOrganizationBodySchema.parse(
    request.body,
  )

  try {
    const authenticateOrganizationService =
      makeAuthenticateOrganizationService()

    const { organization } = await authenticateOrganizationService.execute({
      email,
      password,
    })

    const token = await reply.jwtSign({}, { sign: { sub: organization.id } })

    return reply.status(200).send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
