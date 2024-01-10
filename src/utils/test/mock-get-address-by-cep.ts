import { vi } from 'vitest'

const createMockGetAddressByCep = () => {
  return {
    getAddressByCep: () => {
      return {
        address: {
          postal_code: '12345678',
          street: 'any-street',
          neighborhood: 'any-neighborhood',
          city: 'any-city',
          state: 'any-state',
        },
      }
    },
  }
}

export const mockGetAddressByCep = vi.mock(
  '@/utils/get-address-by-cep',
  createMockGetAddressByCep,
)
