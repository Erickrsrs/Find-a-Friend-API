import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetsByCityService } from '../search-pets-by-city'

export function MakeSearchPetsByCityService() {
  const petsRepository = new PrismaPetsRepository()

  const service = new SearchPetsByCityService(petsRepository)

  return service
}
