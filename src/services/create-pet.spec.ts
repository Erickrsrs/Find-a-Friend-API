import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { CreatePetService } from './create-pet'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryAddressesRepository } from '../repositories/in-memory/in-memory-addresses-repository'

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository
let addressesRepository: InMemoryAddressesRepository
let sut: CreatePetService

describe('create pet service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    addressesRepository = new InMemoryAddressesRepository()
    sut = new CreatePetService(
      petsRepository,
      organizationsRepository,
      addressesRepository,
    )
  })

  it('should be able to create a pet', async () => {
    const address = await addressesRepository.create({
      postal_code: '12345678',
      street: 'any-street',
      neighborhood: 'any-neighborhood',
      city: 'any-city',
      state: 'any-state',
    })

    const organization = await organizationsRepository.create({
      name: 'org-name',
      manager_name: 'org-manager-name',
      email: 'org-email',
      whatsapp: '1199999999',
      password_hash: 'org-password',
      address_id: address.id,
    })

    const { pet } = await sut.execute({
      species: 'dog',
      race: 'pug',
      name: 'Fido',
      about: 'A very nice dog',
      age: 'ADULT',
      size: 'TINY',
      energy: 'LOW',
      independence_level: 'DEPENDENT',
      requirements: ['needs a lot of love'],
      organization_id: organization.id,
    })

    expect(pet).toEqual(expect.any(Object))
  })

  it('should not be able to create a pet without an organization', async () => {
    expect(async () => {
      await sut.execute({
        species: 'dog',
        race: 'pug',
        name: 'Fido',
        about: 'A very nice dog',
        age: 'ADULT',
        size: 'TINY',
        energy: 'LOW',
        independence_level: 'DEPENDENT',
        requirements: ['needs a lot of love'],
        organization_id: 'non-existing-organization-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to create a pet with an invalid address', async () => {
    const organization = await organizationsRepository.create({
      name: 'org-name',
      manager_name: 'org-manager-name',
      email: 'org-email',
      whatsapp: '1199999999',
      password_hash: 'org-password',
      address_id: 'non-existing-address-id',
    })

    expect(async () => {
      await sut.execute({
        species: 'dog',
        race: 'pug',
        name: 'Fido',
        about: 'A very nice dog',
        age: 'ADULT',
        size: 'TINY',
        energy: 'LOW',
        independence_level: 'DEPENDENT',
        requirements: ['needs a lot of love'],
        organization_id: organization.id,
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
