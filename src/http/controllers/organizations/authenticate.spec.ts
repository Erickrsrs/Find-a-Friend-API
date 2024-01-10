import request from 'supertest'
import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import { mockGetAddressByCep } from '@/utils/test/mock-get-address-by-cep'
import { app } from '@/app'

// eslint-disable-next-line no-unused-expressions
mockGetAddressByCep

describe('organizations authenticate controller (e2e)', () => {
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
