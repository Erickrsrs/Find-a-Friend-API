import { AddressesRepository } from '@/repositories/addresses-repository'
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
    private addressesRepository: AddressesRepository,
  ) {}

  async execute({
    ...createPetData
  }: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
    const organization = await this.organizationsRepository.findById(
      createPetData.organization_id,
    )

    if (!organization) {
      throw new ResourceNotFoundError()
    }

    const address = await this.addressesRepository.findById(
      organization.address_id,
    )

    if (!address) {
      throw new ResourceNotFoundError()
    }

    const { city } = address

    const createPetDataWithCity = {
      ...createPetData,
      city,
    }

    const pet = await this.petsRepository.create(createPetDataWithCity)
    return { pet }
  }
}
