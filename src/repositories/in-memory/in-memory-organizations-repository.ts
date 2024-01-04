import { Organization, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { OrganizationsRepository } from '../organizations-repository'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = []

  async findById(id: string) {
    return this.items.find((organization) => organization.id === id) ?? null
  }

  async findByEmail(email: string) {
    const organization = this.items.find((organization) => {
      return organization.email === email
    })

    return organization || null
  }

  async create(data: Prisma.OrganizationUncheckedCreateInput) {
    const organization: Organization = {
      id: randomUUID(),
      name: data.name,
      manager_name: data.manager_name,
      email: data.email,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
      address_id: data.address_id,
      created_at: new Date(),
    }

    this.items.push(organization)

    return organization
  }
}
