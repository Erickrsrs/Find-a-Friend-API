import { Organization, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { OrganizationsRepository } from '../organizations-repository'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = []

  async findByEmail(email: string) {
    const organization = this.items.find((organization) => {
      return organization.email === email
    })

    return organization || null
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: randomUUID(),
      name: data.name,
      manager_name: data.manager_name,
      email: data.email,
      CEP: data.CEP,
      address: data.address,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(organization)

    return organization
  }
}
