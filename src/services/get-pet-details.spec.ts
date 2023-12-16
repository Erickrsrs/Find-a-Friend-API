import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsService } from './get-pet-details'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsService

describe('get pet details service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsService(petsRepository)
  })

  it('should be able to get pet details', async () => {
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
      organization_id: 'org-id',
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
