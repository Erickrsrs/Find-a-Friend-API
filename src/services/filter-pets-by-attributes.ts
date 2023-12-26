import { $Enums, Pet } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'

export interface FilterPetsByAttributesServiceRequest {
  species?: string
  age?: $Enums.Age
  size?: $Enums.Size
  energy?: $Enums.Energy
  independence_level?: $Enums.IndependenceLevel
}

interface FilterPetsByAttributesServiceResponse {
  pets: Pet[]
}

export class FilterPetsByAttributesService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    ...filterPetsData
  }: FilterPetsByAttributesServiceRequest): Promise<FilterPetsByAttributesServiceResponse> {
    const pets = await this.petsRepository.filterByAttributes(filterPetsData)

    return { pets }
  }
}
