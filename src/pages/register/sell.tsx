import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { withProtected, withPublic } from "../../hook/route";
import DatePicker from "react-datepicker";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {IPostClient, IPostSignupProvider} from '../../types/index'
import "react-datepicker/dist/react-datepicker.css";
import {Client} from '../../service/Client'



const RegisterSell = () => {

  const router = useRouter();
  const { control, register, handleSubmit } = useForm<IPostSignupProvider>();

  const myOnSubmit: any =  async (submit: IPostSignupProvider) => {
    try {     
      console.log(submit)
      // if(await Client.createClient(submit)) {
      //   setTimeout(() => {
      //     router.replace('/')
      //   }, 2000)
        
      // }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    
    <div className='mt-10 px-4 flex justify-center items-center'>
      <form className='container lg:mx-auto max-w-sm' onSubmit={handleSubmit(myOnSubmit)}>
        <div className="relative mb-6">
          <label>E-mail Cliente</label>
          <input {...register("email", { required: true })} className='bg-white border-2 border-black border-b-4 text-black-900 text-sm rounded-lg focus:ring-black focus:border-white focus:border-2 block w-full p-2.5' type="text" placeholder='Email' />
        </div>
        <div className="relative mb-6">
          <label>Nome</label>
          <input {...register("display_name", { required: true })} className='bg-white border-2 border-black border-b-4 text-black-900 text-sm rounded-lg focus:ring-black focus:border-white focus:border-2 block w-full p-2.5' type="text" />
        </div>
        <div className="relative mb-6">
          <label>CPF</label>
          <input {...register("cpf", { required: true })} className='bg-white border-2 border-black border-b-4 text-black-900 text-sm rounded-lg focus:ring-black focus:border-white focus:border-2 block w-full p-2.5' type="text" />
        </div>
        <div className="relative mb-6">
          <label>Celular</label>
          <input {...register("phone_number", { required: true })} className='bg-white border-2 border-black border-b-4 text-black-900 text-sm rounded-lg focus:ring-black focus:border-white focus:border-2 block w-full p-2.5' type="text" />
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

export default withPublic(RegisterSell)