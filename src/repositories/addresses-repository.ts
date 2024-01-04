import { Address, Prisma } from '@prisma/client'

export interface AddressesRepository {
  findById: (id: string) => Promise<Address | null>
  create: (data: Prisma.AddressCreateInput) => Promise<Address>
}
