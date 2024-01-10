import request from 'supertest'
import { app } from '@/app'
import { vi, afterAll, beforeAll, describe, it, expect } from 'vitest'

vi.mock('@/utils/get-address-by-cep', () => {
  return {
    getAddressByCep: () => {
      return {
        address: {
          postal_code: '12345678',
          street: 'any-street',
          neighborhood: 'any-neighborhood',
          city: 'any-city',
          state: 'any-state',
        },
      }
    },
  }
})

describe('authenticate controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate an organization', async () => {
    await request(app.server).post('/organizations').send({
      name: 'Organization Name',
      managerName: 'Manager Name',
      email: 'organization@example.org',
      cep: '00000000',
      complement: 'Organization Complement',
      whatsapp: '00000000000',
      password: 'organization-password',
    })

    const response = await request(app.server).post('/authenticate').send({
      email: 'organization@example.org',
      password: 'organization-password',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
