import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    return this.items.find((pet) => pet.id === id) ?? null
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
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
