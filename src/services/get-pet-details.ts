import { Pet } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetPetDetailsServiceRequest {
  petId: string
}

interface GetPetDetailsServiceResponse {
  pet: Pet
}

export class GetPetDetailsService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetDetailsServiceRequest): Promise<GetPetDetailsServiceResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
