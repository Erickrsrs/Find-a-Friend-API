import { expect, it, describe, beforeEach, vi } from 'vitest'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository'
import { RegisterOrganizationService } from './register-organization'
import { compare } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

// Mock the getAddressByCEP function
vi.mock('../utils/get-address-by-cep', () => {
  return {
    getAddressByCEP: () => {
      return { address: 'logradouro, bairro, localidade - uf' }
    },
  }
})

let organizationsRepository: InMemoryOrganizationsRepository
let sut: RegisterOrganizationService

describe('create organization service', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterOrganizationService(organizationsRepository)
  })

  it('should be able to register an organization', async () => {
    const { organization } = await sut.execute({
      name: 'org-name',
      managerName: 'org-manager-name',
      email: 'org@email.com',
      CEP: '12345678',
      whatsapp: '1199999999',
      password: 'org-password',
    })

    expect(organization).toEqual(expect.any(Object))
  })

  it('should be able to hash user password upon organization registration', async () => {
    const { organization } = await sut.execute({
      name: 'org-name',
      managerName: 'org-manager-name',
      email: 'org@email.com',
      CEP: '12345678',
      whatsapp: '1199999999',
      password: 'org-password',
    })

    const isPasswordHashed = await compare(
      'org-password',
      organization.password_hash,
    )

    expect(isPasswordHashed).toBe(true)
  })

  it('should be able to not allow two organizations with the same email', async () => {
    const email = 'org@email.com'

    await sut.execute({
      name: 'org-name',
      managerName: 'org-manager-name',
      email,
      CEP: '12345678',
      whatsapp: '1199999999',
      password: 'org-password',
    })

    expect(async () => {
      await sut.execute({
        name: 'org-name',
        managerName: 'org-manager-name',
        email,
        CEP: '12345678',
        whatsapp: '1199999999',
        password: 'org-password',
      })
    }).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})
