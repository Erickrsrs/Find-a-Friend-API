import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PetsRepository } from '../pets-repository'
import { FilterPetsByAttributesServiceRequest } from '@/services/filter-pets-by-attributes'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = prisma.pet.findUnique({
      where: { id },
    })

    return pet
  }

  async findByCity(city: string) {
    const pets = prisma.pet.findMany({
      where: { city },
    })

    return pets
  }

  async filterByAttributes(filter: FilterPetsByAttributesServiceRequest) {
    const pets = prisma.pet.findMany({
      where: {
        species: filter.species,
        age: filter.age,
        size: filter.size,
        energy: filter.energy,
        independence_level: filter.independence_level,
      },
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = prisma.pet.create({
      data,
    })

    return pet
  }
}
