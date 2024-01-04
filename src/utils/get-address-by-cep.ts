/* eslint-disable camelcase */
import axios from 'axios'

interface ViacepResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

export async function getAddressByCEP(CEP: string) {
  try {
    const {
      cep: postal_code,
      logradouro: street,
      bairro: neighborhood,
      localidade: city,
      uf: state,
    }: ViacepResponse = await axios.get(`https://viacep.com.br/ws/${CEP}/json/`)

    const address = {
      postal_code,
      street,
      neighborhood,
      city,
      state,
    }

    return { address }
  } catch (err) {
    throw new Error('CEP not found')
  }
}
