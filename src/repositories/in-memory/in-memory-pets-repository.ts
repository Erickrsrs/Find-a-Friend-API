import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../pets-repository'
import { FilterPetsByAttributesServiceRequest } from '@/services/filter-pets-by-attributes'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    return this.items.find((pet) => pet.id === id) ?? null
  }

  async findByCity(city: string) {
    return this.items.filter((pet) => pet.city === city)
  }

  async filterByAttributes(filter: FilterPetsByAttributesServiceRequest) {
    return this.items.filter((pet) => {
      return (
        (!filter.species || pet.species === filter.species) &&
        (!filter.age || pet.age === filter.age) &&
        (!filter.size || pet.size === filter.size) &&
        (!filter.energy || pet.energy === filter.energy) &&
        (!filter.independence_level ||
          pet.independence_level === filter.independence_level)
      )
    })
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      species: data.species,
      race: data.race ?? null,
      name: data.name,
      about: data.about ?? null,

      age: data.age,
      size: data.size,
      energy: data.energy,
      independence_level: data.independence_level,

      requirements: (data.requirements as string[]) || [],
      organization_id: data.organization_id,
      city: data.city,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
