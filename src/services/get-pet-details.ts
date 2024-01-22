import { AddressesRepository } from './../repositories/addresses-repository'
import { Address, Organization, Pet } from '@prisma/client'
import { OrganizationsRepository } from './../repositories/organizations-repository'
import { PetsRepository } from '../repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetPetDetailsServiceRequest {
  petId: string
}

interface GetPetDetailsServiceResponse {
  pet: Pet
  organization: Organization
  address: Address
}

export class GetPetDetailsService {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
    private addressesRepository: AddressesRepository,
  ) {}

  async execute({
    petId,
  }: GetPetDetailsServiceRequest): Promise<GetPetDetailsServiceResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    const organization = await this.organizationsRepository.findById(
      pet.organization_id,
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

    return { pet, organization, address }
  }
}
