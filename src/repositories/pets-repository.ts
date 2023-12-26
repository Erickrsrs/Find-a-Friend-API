import { Pet, Prisma } from '@prisma/client'
import { FilterPetsByAttributesServiceRequest } from '../services/filter-pets-by-attributes'

export interface PetsRepository {
  findById: (id: string) => Promise<Pet | null>
  findByCity: (city: string) => Promise<Pet[]>
  filterByAttributes: (
    filter: FilterPetsByAttributesServiceRequest,
  ) => Promise<Pet[]>
  create: (data: Prisma.PetUncheckedCreateInput) => Promise<Pet>
}
