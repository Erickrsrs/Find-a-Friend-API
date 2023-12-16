import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import { ZodError } from 'zod'
import { env } from './env'

export const prisma = new PrismaClient()

export const app = fastify()

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } // TODO: Here we can send the error to a logger service

  return reply.status(500).send({ message: 'Internal server error' })
})
