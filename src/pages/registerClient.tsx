import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { withProtected, withPublic } from "../hook/route";
import DatePicker from "react-datepicker";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {IPostClient} from '../types/index'
import "react-datepicker/dist/react-datepicker.css";
import {Client} from '../service/Client'



const RegisterClient = () => {

  const [startDate, setStartDate] = useState(new Date());
  const { control, register, handleSubmit } = useForm<IPostClient>();

  const myOnSubmit: any =  async (submit: IPostClient) => {
    try {
      submit.display_name = "abobado"
      submit.birth_date = new Date(submit.birth_date).toISOString().split('T')[0].replaceAll("-", "/")
      await Client.createClient(submit)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    
    <div className='mt-10 px-4 flex justify-center items-center'>
      <form className='container lg:mx-auto max-w-sm' onSubmit={handleSubmit(myOnSubmit)}>
        <div className="relative mb-6">
          <label>E-mail</label>
          <input {...register("email", { required: true })} className='bg-white border-2 border-black border-b-4 text-black-900 text-sm rounded-lg focus:ring-black focus:border-white focus:border-2 block w-full p-2.5' type="text" placeholder='Email' />
        </div>
        <div className="relative mb-6">
          <label>Nome</label>
          <input {...register("name", { required: true })} className='bg-white border-2 border-black border-b-4 text-black-900 text-sm rounded-lg focus:ring-black focus:border-white focus:border-2 block w-full p-2.5' type="text" />
        </div>
        <div className="relative mb-6">
          <label>CPF</label>
          <input {...register("cpf", { required: true })} className='bg-white border-2 border-black border-b-4 text-black-900 text-sm rounded-lg focus:ring-black focus:border-white focus:border-2 block w-full p-2.5' type="text" />
        </div>
        <div className="relative mb-6">
          <label>Celular</label>
          <input {...register("phone_number", { required: true })} className='bg-white border-2 border-black border-b-4 text-black-900 text-sm rounded-lg focus:ring-black focus:border-white focus:border-2 block w-full p-2.5' type="text" />
        </div>
        <div className="relative mb-6">
          <label>Data de Nascimento</label>
          { 
          <Controller
              control={control}
              name="birth_date"
              render={({field}) => (
                <DatePicker 
                  className="bg-white border-2 border-black border-b-4 text-black-900 text-sm rounded-lg focus:ring-black focus:border-white focus:border-2 block w-full p-2.5" 
                  placeholderText="Select date"
                  selected={field.value} 
                  onChange={(date) => field.onChange(date)}
                  dateFormat="yyyy/MM/dd"/>
              )} />
            }
        </div>
        <div className='relative mb-6'>
          <button type="submit" className='bg-black text-white text-sm rounded-lg focus:ring-black block w-full p-2.5'>
            ENVIAR
          </button>
        </div>
        
      </form>
    </div>
  )
}

export default withPublic(RegisterClient)