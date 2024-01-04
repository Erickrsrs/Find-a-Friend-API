import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FilterPetsByAttributesService } from '../filter-pets-by-attributes'

export function MakeFilterPetsByAttributesService() {
  const petsRepository = new PrismaPetsRepository()

  const service = new FilterPetsByAttributesService(petsRepository)

  return service
}
