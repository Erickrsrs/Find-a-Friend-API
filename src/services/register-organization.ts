import { hash } from 'bcryptjs'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { getAddressByCEP } from '../utils/get-address-by-cep'

interface RegisterOrganizationServiceRequest {
  name: string
  managerName: string
  email: string
  CEP: string
  whatsapp: string
  password: string
}

interface RegisterOrganizationServiceResponse {
  organization: Organization
}

export class RegisterOrganizationService {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    managerName,
    email,
    CEP,
    whatsapp,
    password,
  }: RegisterOrganizationServiceRequest): Promise<RegisterOrganizationServiceResponse> {
    const { address } = await getAddressByCEP(CEP)

    const passwordHash = await hash(password, 6)

    const organization = await this.organizationsRepository.create({
      name,
      manager_name: managerName,
      email,
      CEP,
      address,
      whatsapp,
      password_hash: passwordHash,
    })

    return { organization }
  }
}
