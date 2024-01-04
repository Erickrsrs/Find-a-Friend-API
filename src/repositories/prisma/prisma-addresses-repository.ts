import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { AddressesRepository } from '../addresses-repository'

export class PrismaAddressesRepository implements AddressesRepository {
  async findById(id: string) {
    const address = prisma.address.findUnique({
      where: { id },
    })

    return address
  }

  async create(data: Prisma.AddressCreateInput) {
    const address = prisma.address.create({
      data,
    })

    return address
  }
}
