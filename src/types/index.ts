interface SharedInfos {
  id: number
  name: string
  display_name: string
  email: string
  phone_number: string
}

export interface ServiceProviders extends SharedInfos {
  cpf: string
  signal: number
  description: string
}

export interface Clients extends SharedInfos {
  cpf: string
  birth_date: Date
  country: string
  state: string
  city: string
  district: string
  address: string
  number: string
  zip_code: string
  complement: string
}


export interface Studio extends SharedInfos {
  country: string
  state: string
  city: string
  district: string
  address: string
  number: number
  zip_code: string
  complement: string
  description: string
  email_owner: string
} 

export interface Sell {

}


export interface IPostClient extends Clients {

}