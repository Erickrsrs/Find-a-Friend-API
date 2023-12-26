import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { CreatePetService } from './create-pet'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository
let sut: CreatePetService

describe('create pet service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreatePetService(petsRepository, organizationsRepository)
  })

  it('should be able to create a pet', async () => {
    const organization = await organizationsRepository.create({
      name: 'org-name',
      manager_name: 'org-manager-name',
      email: 'org-email',
      CEP: '12345678',
      address: 'org-address',
      whatsapp: '1199999999',
      password_hash: 'org-password',
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
})
