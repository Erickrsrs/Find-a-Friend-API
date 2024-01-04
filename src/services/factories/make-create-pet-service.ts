import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetService } from '../create-pet'

export function MakeCreatePetService() {
  const petsRepository = new PrismaPetsRepository()
  const organizationsRepository = new PrismaOrganizationsRepository()
  const addressesRepository = new PrismaAddressesRepository()

  const service = new CreatePetService(
    petsRepository,
    organizationsRepository,
    addressesRepository,
  )

  return service
}
