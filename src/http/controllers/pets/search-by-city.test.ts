import request from 'supertest'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'

describe('pets search by city controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pets by city', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    await request(app.server)
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

    await request(app.server)
      .post('/pets/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        species: 'Canine',
        race: 'Poodle',
        name: 'Bob 2',
        about: 'A dog',
        age: 'ADULT',
        size: 'MEDIUM',
        energy: 'MODERATE',
        independence_level: 'DEPENDENT',
        requirements: ['Regular exercise'],
      })

    const response = await request(app.server)
      .get(`/pets?city=any-city`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets.length).toEqual(2)
  })
})
