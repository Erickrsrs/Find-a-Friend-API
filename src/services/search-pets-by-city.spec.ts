import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { SearchPetsByCityService } from './search-pets-by-city'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetsByCityService

describe('search pet by city service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsByCityService(petsRepository)
  })

  it('should be able to search a pet by city', async () => {
    petsRepository.create({
      species: 'dog',
      race: 'pug',
      name: 'Fido',
      about: 'A very nice dog',
      age: 'ADULT',
      size: 'TINY',
      energy: 'LOW',
      independence_level: 'DEPENDENT',
      requirements: ['needs a lot of love'],
      organization_id: 'organization.id',
      address: 'logradouro, bairro, São Paulo - SP',
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
    })

    expect(pets).toEqual(expect.any(Array))
    expect(pets).toHaveLength(1)
  })
})
