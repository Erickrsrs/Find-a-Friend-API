import { $Enums, Pet } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'
import { OrganizationsRepository } from '../repositories/organizations-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

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
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    ...data
  }: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
    const organization = await this.organizationsRepository.findById(
      data.organization_id,
    )

    if (!organization) {
      throw new ResourceNotFoundError()
    }

    const { address } = organization

    const petDataWithAddress = {
      ...data,
      address,
    }

    const pet = await this.petsRepository.create(petDataWithAddress)
    return { pet }
  }
}
