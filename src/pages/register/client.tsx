import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { withProtected, withPublic } from "../../hook/route";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { IPostClient } from '../../types/index'
import "react-datepicker/dist/react-datepicker.css";
import 'react-phone-number-input/style.css'
import { Client } from '../../service/Client'
import { ErrorMessage } from '@hookform/error-message';
import { cpf } from 'cpf-cnpj-validator';
import { differenceInYears } from 'date-fns';
import isEmail from 'validator/lib/isEmail';
import PhoneInput from 'react-phone-number-input'
import DatePicker from "react-datepicker";


const RegisterClient = () => {

  const router = useRouter();
  const { control, register, handleSubmit, formState: {errors} } = useForm<IPostClient>();
  const [loading, setLoading] = useState(false)

  const myOnSubmit: any = async (submit: IPostClient) => {
    try {
      setLoading(true)
      if (await Client.createClient(submit)) {
        router.replace('/register/client')
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  return (

    <div className='m-4 px-4 flex justify-center items-center'> 
      <form className='container lg:mx-auto max-w-sm' onSubmit={handleSubmit(myOnSubmit)}>
        <div className='mb-4 flex'>
          <h1 className='text-2xl font-bold dark:text-black'>Perfil cliente</h1>
        </div>
        <div className="relative mb-6">
          <label>E-mail</label>
          <input {...register("email",
            {
              required: "Campo Obrigatório",
              minLength: {
                value: 10,
                message: "Campo Obrigatório"
              },
              validate: (value) => {
                if (!isEmail(value)) return "Email inválido"
              }
            })} className='bg-white border-2 border-black border-b-4 text-black-900 text-sm rounded-lg block w-full p-2.5' type="text" placeholder='Email' />
          <ErrorMessage errors={errors} name="email" />
        </div>
        <div className="relative mb-6">
          <label>Nome</label>
          <input {...register("display_name", {
            required: "Campo Obrigatório",
            minLength: {
              value: 10,
              message: "Nome muito curto"
            },
            maxLength: {
              value: 36,
              message: "Nome muito longo"
            }
          })} className='bg-white border-2 border-black border-b-4 text-black-900 text-sm rounded-lg block w-full p-2.5' type="text" />
          <ErrorMessage errors={errors} name="display_name" />
        </div>
        <div className="relative mb-6">
          <label>CPF</label>
          <input id='cpf' {...register("cpf",
            {
              required: "Campo Obrigatório",
              minLength: {
                value: 11,
                message: "nao"
              },
              maxLength: 11,
              validate: (value) => {
                if (!cpf.isValid(value)) return "Informe um CPF valido"
              }
            })} pattern="\d*+" className='bg-white border-2 border-black border-b-4 text-black-900 text-sm rounded-lg block w-full p-2.5' type="number" />
          <ErrorMessage errors={errors} name="cpf" />
        </div>
        <div className="relative mb-6">
          <label>Celular</label>
          {
            <Controller
              control={control}
              name="phone_number"
              rules={{ required: "Campo Obrigatório", minLength: 10 }}
              render={({ field }) => (
                <PhoneInput
                  className='bg-white border-2 border-black border-b-4 text-black-900 text-sm rounded-lg block w-full p-2.5'
                  name="phone_number"
                  rules={{ required: true }}
                  onChange={(phone) => field.onChange(phone)}
                  defaultCountry="BR"
                />
              )}
            />

          }
          <ErrorMessage errors={errors} name="phone_number" />
        </div>
        <div className="relative mb-6">
          <label>Data de Nascimento</label>
          {
            <Controller
              control={control}
              name="birth_date"
              rules={{
                required: "Campo Obrigatório", 
                validate: (value) => {
                  if (differenceInYears(new Date(), new Date(value)) < 18) return "É preciso ser maior de 18 anos"
                }
              }}
              render={({ field }) => (
                <DatePicker
                  className="bg-white border-2 border-black border-b-4 text-black-900 text-sm rounded-lg focus:ring-black focus:border-white focus:border-2 block w-full p-2.5"
                  placeholderText="Select date"
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd/MM/yyyy" />
              )} />
          }
          <ErrorMessage errors={errors} name="birth_date" />
        </div>
        <div className='relative mb-6'>
          {
            !loading ? (
              <button type="submit" className='bg-black text-white text-sm rounded-lg focus:ring-black block w-full p-2.5'>
                CADASTRAR
              </button>
            ) : (
              <button disabled type="button" className="place-content-center bg-black text-white text-sm rounded-lg focus:ring-black block w-full p-2.5 py-2.5 px-5 mr-2 text-sm font-medium text-white bg-white rounded-lg border border-gray-200 inline-flex items-center">
                <svg className="inline mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
              </button>
            )
          }
        </div>
      </form>
    </div>
  )
}

export default withPublic(RegisterClient)