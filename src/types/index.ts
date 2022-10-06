interface SharedInfos {
  id: number
  name: string
  display_name: string
  email: string
  phone_number: string
}

export interface ServiceProviders extends SharedInfos {
  cpf: string
  description: string
  birth_date: string
}

export interface Clients extends SharedInfos {
  cpf: string
  birth_date: string
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
  studio_name: string
  client_name: string
  service_provider_name: string
  service_style_name: string
  tender_id: number
  price: number
  studio_rate: number
  client_rate: number
  service_provider_rate: number
  start_time: string
}

export interface IPostRegisterSell {
  client_name: string
  service_provider_name: string
  price: number
  number_of_sessions: number
  studio_name?: string
  description?: string
  start_time: string
  last_update?: Date
}

export interface IPostClient {
  name: string
  email: string
  display_name: string
  phone_number?: string
  birth_date: string
}

export interface IPostProvider extends ServiceProviders {
  password: string
}

export interface IPostSell extends Sell {

}

