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
    const { uf, localidade, bairro, logradouro }: ViacepResponse =
      await axios.get(`https://viacep.com.br/ws/${CEP}/json/`)

    const address = `${logradouro}, ${bairro}, ${localidade} - ${uf}`
    return { address }
  } catch (err) {
    throw new Error('CEP not found')
  }
}
