import request from 'supertest'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'

describe('pets filter by attributes controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get filter pets by attributes', async () => {
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

    const { pet } = await request(app.server)
      .post('/pets/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        species: 'cat',
        race: 'Persian',
        name: 'Lion',
        about: 'A cat',
        age: 'ADULT',
        size: 'MEDIUM',
        energy: 'MODERATE',
        independence_level: 'DEPENDENT',
        requirements: [],
      })
      .then((response) => response.body)

    const response = await request(app.server)
      .get(
        `/pets/filter?species=cat&age=${pet.age}&size=${pet.size}&energy=${pet.energy}&independence_level=${pet.independence_level}`,
      )
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets.length).toEqual(1)
  })
})
