import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { FilterPetsByAttributesService } from './filter-pets-by-attributes'

let petsRepository: InMemoryPetsRepository
let sut: FilterPetsByAttributesService

describe('filter pets by attributes service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FilterPetsByAttributesService(petsRepository)
  })

  it('should be able to get all pets without filters', async () => {
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
      city: 'São Paulo',
    })

    petsRepository.create({
      species: 'dog',
      race: 'pug',
      name: 'Fido the second',
      about: 'A very nice dog',
      age: 'SENIOR',
      size: 'TINY',
      energy: 'LOW',
      independence_level: 'DEPENDENT',
      requirements: ['not needs a lot of love'],
      organization_id: 'organization.id',
      city: 'São Paulo',
    })

    const { pets } = await sut.execute({})

    expect(pets).toEqual(expect.any(Array))
    expect(pets).toHaveLength(2)
  })

  it('should be able to get pets with filters', async () => {
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
      city: 'São Paulo',
    })

    const { pets } = await sut.execute({
      age: 'ADULT',
      size: 'TINY',
      energy: 'LOW',
      independence_level: 'DEPENDENT',
    })

    expect(pets).toEqual(expect.any(Array))
    expect(pets).toHaveLength(1)
  })

  it("should not be able to get pets using filters that don't match", async () => {
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
      city: 'São Paulo',
    })

    const { pets } = await sut.execute({
      age: 'SENIOR',
    })

    expect(pets).toEqual(expect.any(Array))
    expect(pets).toHaveLength(0)
  })
})
