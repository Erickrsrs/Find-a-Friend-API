import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { CreatePetService } from './create-pet'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetService

describe('create pet service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetService(petsRepository)
  })

  it('should be able to create a pet', async () => {
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
      organization_id: 'org-id',
    })

    expect(pet).toEqual(expect.any(Object))
  })
})
