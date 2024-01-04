import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { CreateOrganizationService } from '../create-organization'

export function MakeCreateOrganizationService() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const addressesRepository = new PrismaAddressesRepository()

  const service = new CreateOrganizationService(
    organizationsRepository,
    addressesRepository,
  )

  return service
}
