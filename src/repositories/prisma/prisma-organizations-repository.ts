import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { OrganizationsRepository } from '../organizations-repository'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async findById(id: string) {
    const organization = prisma.organization.findUnique({
      where: { id },
    })

    return organization
  }

  async findByEmail(email: string) {
    const organization = prisma.organization.findUnique({
      where: { email },
    })

    return organization
  }

  async create(data: Prisma.OrganizationUncheckedCreateInput) {
    const organization = prisma.organization.create({
      data,
    })

    return organization
  }
}
