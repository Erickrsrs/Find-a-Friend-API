import request from 'supertest'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'

describe('pets create controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const response = await request(app.server)
      .post('/pets/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        species: 'Canine',
        race: 'Poodle',
        name: 'Bob',
        about: 'A dog',
        age: 'ADULT',
        size: 'MEDIUM',
        energy: 'MODERATE',
        independence_level: 'DEPENDENT',
        requirements: ['Regular exercise'],
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body.pet).toHaveProperty('city', expect.any(String))
  })
})
