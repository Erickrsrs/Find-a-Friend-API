import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { GetPetDetailsService } from '../get-pet-details'

export function MakeGetPetDetailsService() {
  const petsRepository = new PrismaPetsRepository()
  const organizationsRepository = new PrismaOrganizationsRepository()
  const addressesRepository = new PrismaAddressesRepository()

  const service = new GetPetDetailsService(
    petsRepository,
    organizationsRepository,
    addressesRepository,
  )

  return service
}
