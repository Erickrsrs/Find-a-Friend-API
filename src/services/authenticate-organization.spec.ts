import { expect, it, describe, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository'
import { AuthenticateOrganizationService } from './authenticate-organization'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: AuthenticateOrganizationService

describe('authenticate organization service', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateOrganizationService(organizationsRepository)
  })

  it('should be able to authenticate an organization', async () => {
    await organizationsRepository.create({
      name: 'org-name',
      manager_name: 'org-manager-name',
      email: 'org-email@email.org',
      CEP: '12345678',
      address: 'org-address',
      whatsapp: '1199999999',
      password_hash: await hash('org-password', 6),
    })

    const { organization } = await sut.execute({
      email: 'org-email@email.org',
      password: 'org-password',
    })

    expect(organization).toEqual(expect.any(Object))
  })

  it('should not be able to authenticate an organization with wrong email', async () => {
    expect(async () => {
      await sut.execute({
        email: 'wrong-org-email@email.org',
        password: 'org-password',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate an organization with wrong password', async () => {
    await organizationsRepository.create({
      name: 'org-name',
      manager_name: 'org-manager-name',
      email: 'org-email@email.org',
      CEP: '12345678',
      address: 'org-address',
      whatsapp: '1199999999',
      password_hash: await hash('org-password', 6),
    })

    expect(async () => {
      await sut.execute({
        email: 'org-email@email.org',
        password: 'wrong-org-password',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
