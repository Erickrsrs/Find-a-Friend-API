import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { AuthenticateOrganizationService } from '../authenticate-organization'

export function makeAuthenticateOrganizationService() {
  const organizationsRepository = new PrismaOrganizationsRepository()

  const service = new AuthenticateOrganizationService(organizationsRepository)

  return service
}
