import { Address, Prisma } from '@prisma/client'
import { AddressesRepository } from '../addresses-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryAddressesRepository implements AddressesRepository {
  public items: Address[] = []

  async findById(id: string) {
    return this.items.find((address) => address.id === id) ?? null
  }

  async create(data: Prisma.AddressCreateInput) {
    const address = {
      id: randomUUID(),
      postal_code: data.postal_code,
      street: data.street,
      complement: data.complement ?? null,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      created_at: new Date(),
    }

    this.items.push(address)

    return address
  }
}
