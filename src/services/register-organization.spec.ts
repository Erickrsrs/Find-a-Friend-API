import { expect, it, describe, beforeEach, vi } from 'vitest'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository'
import { RegisterOrganizationService } from './register-organization'
import { compare } from 'bcryptjs'
import { AddressesRepository } from '../repositories/addresses-repository'
import { InMemoryAddressesRepository } from '../repositories/in-memory/in-memory-addresses-repository'

// Mock the getAddressByCEP function
vi.mock('../utils/get-address-by-cep', () => {
  return {
    getAddressByCEP: () => {
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

let organizationsRepository: InMemoryOrganizationsRepository
let addressesRepository: AddressesRepository
let sut: RegisterOrganizationService

describe('create organization service', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    addressesRepository = new InMemoryAddressesRepository()
    sut = new RegisterOrganizationService(
      organizationsRepository,
      addressesRepository,
    )
  })

  it('should be able to register an organization', async () => {
    const { organization } = await sut.execute({
      name: 'org-name',
      managerName: 'org-manager-name',
      email: 'org@email.com',
      cep: '12345678',
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
      cep: '12345678',
      whatsapp: '1199999999',
      password: 'org-password',
    })

    const isPasswordHashed = await compare(
      'org-password',
      organization.password_hash,
    )

    expect(isPasswordHashed).toBe(true)
  })
})
