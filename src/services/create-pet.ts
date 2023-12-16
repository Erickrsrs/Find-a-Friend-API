import { $Enums, Pet } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'

interface CreatePetServiceRequest {
  species: string
  race: string | null
  name: string
  about: string | null
  age: $Enums.Age
  size: $Enums.Size
  energy: $Enums.Energy
  independence_level: $Enums.IndependenceLevel
  requirements: string[]
  organization_id: string
}

interface CreatePetServiceResponse {
  pet: Pet
}

export class CreatePetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    ...data
  }: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
    const pet = await this.petsRepository.create(data)
    return { pet }
  }
}
