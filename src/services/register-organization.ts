import { hash } from 'bcryptjs'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { getAddressByCEP } from '../utils/get-address-by-cep'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

interface RegisterOrganizationServiceRequest {
  name: string
  managerName: string
  email: string
  CEP: string
  complement?: string
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
    complement,
    whatsapp,
    password,
  }: RegisterOrganizationServiceRequest): Promise<RegisterOrganizationServiceResponse> {
    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    let { address } = await getAddressByCEP(CEP)

    if (complement) {
      const addressParts = address.split(', ')
      addressParts.splice(1, 0, complement)
      address = addressParts.join(', ')
    }

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
