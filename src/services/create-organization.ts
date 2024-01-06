import { AddressesRepository } from '@/repositories/addresses-repository'
import { hash } from 'bcryptjs'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { getAddressByCep } from '../utils/get-address-by-cep'

interface CreateOrganizationServiceRequest {
  name: string
  managerName: string
  email: string
  cep: string
  complement?: string
  whatsapp: string
  password: string
}

interface CreateOrganizationServiceResponse {
  organization: Organization
}

export class CreateOrganizationService {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private addressesRepository: AddressesRepository,
  ) {}

  async execute({
    name,
    managerName,
    email,
    cep,
    complement,
    whatsapp,
    password,
  }: CreateOrganizationServiceRequest): Promise<CreateOrganizationServiceResponse> {
    const { address } = await getAddressByCep(cep) // this should be received from the frontend

    const organizationAddress = await this.addressesRepository.create({
      ...address,
      complement,
    })

    const passwordHash = await hash(password, 6)

    const organization = await this.organizationsRepository.create({
      name,
      manager_name: managerName,
      email,
      address_id: organizationAddress.id,
      whatsapp,
      password_hash: passwordHash,
    })

    return { organization }
  }
}
