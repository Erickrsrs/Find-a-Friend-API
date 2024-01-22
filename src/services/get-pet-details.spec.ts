import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository'
import { InMemoryAddressesRepository } from '../repositories/in-memory/in-memory-addresses-repository'
import { GetPetDetailsService } from './get-pet-details'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository
let addressesRepository: InMemoryAddressesRepository
let sut: GetPetDetailsService

describe('get pet details service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    addressesRepository = new InMemoryAddressesRepository()
    sut = new GetPetDetailsService(
      petsRepository,
      organizationsRepository,
      addressesRepository,
    )
  })

  it('should be able to get pet details', async () => {
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

    const createdPet = await petsRepository.create({
      species: 'dog',
      race: 'pug',
      name: 'Fido',
      about: 'A very nice dog',
      age: 'ADULT',
      size: 'TINY',
      energy: 'LOW',
      independence_level: 'DEPENDENT',
      requirements: ['needs a lot of love'],
      city: 'São Paulo',
      organization_id: organization.id,
    })

    const { pet } = await sut.execute({ petId: createdPet.id })

    expect(pet).toEqual(expect.any(Object))
  })

  it('should not be able to get pet details with wrong id', async () => {
    expect(async () => {
      await sut.execute({
        petId: 'wrong-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
