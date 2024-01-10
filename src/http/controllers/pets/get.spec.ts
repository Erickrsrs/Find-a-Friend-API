import request from 'supertest'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'

describe('pets get controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const { body } = await request(app.server)
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

    const response = await request(app.server)
      .get(`/pets/${body.pet.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
  })
})
