import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'
import { env } from './env'
import { organizationsRoutes } from './http/controllers/organizations/@routes'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { petsRoutes } from './http/controllers/pets/@routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(organizationsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return reply.status(400).send({
        message: 'This email is already in use',
      })
    }
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } // TODO: Here we can send the error to a logger service

  return reply.status(500).send({ message: 'Internal server error' })
})
