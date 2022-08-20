
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { withPublic } from "../hook/route";


interface IFormInput {
  email: string;
  password: string;
}

const Signup  = ({ auth, pathname }) => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const { createUserWithEmailAndPassword, user, error } = auth;
  
    

  const myOnSubmit: SubmitHandler<IFormInput> =  async (submit) => {
    try {
      await createUserWithEmailAndPassword(submit.email, submit.password)
    } catch (err) {
      console.log(err)
    }
  }
 
  
  return (
      
      <>
      <div className='container mx-auto'>
      <div className="min-h-screen flex items-center justify-center white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"/>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create Your Account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(myOnSubmit)}>
            <input type="hidden" name="remember" value="True"/>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input {...register("email", { required: true })} id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input {...register("password", { required: true })} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"/>
              </div>
            </div>
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
                CREATE
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
      </>
    
  )
}

export default withPublic(Signup)