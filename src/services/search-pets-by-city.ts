import { Pet } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'

interface SearchPetsByCityServiceRequest {
  city: string
}

interface SearchPetsByCityServiceResponse {
  pets: Pet[]
}

export class SearchPetsByCityService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: SearchPetsByCityServiceRequest): Promise<SearchPetsByCityServiceResponse> {
    const pets = await this.petsRepository.findByCity(city)

    return { pets }
  }
}
