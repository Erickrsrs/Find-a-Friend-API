import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  const address = await prisma.address.create({
    data: {
      postal_code: '12345678',
      street: 'any-street',
      neighborhood: 'any-neighborhood',
      city: 'any-city',
      state: 'any-state',
    },
  })

  await prisma.organization.create({
    data: {
      name: 'org-name',
      manager_name: 'org-manager-name',
      email: 'org-email@email.org',
      address_id: address.id,
      whatsapp: '1199999999',
      password_hash: await hash('org-password', 6),
    },
  })

  const authResponse = await request(app.server).post('/authenticate').send({
    email: 'org-email@email.org',
    password: 'org-password',
  })

  const { token } = authResponse.body

  return { token }
}
