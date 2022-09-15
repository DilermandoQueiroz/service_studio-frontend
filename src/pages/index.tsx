import React, { useState, useEffect, useCallback, useRef } from 'react'
import { ServiceProviderCard } from '../components/Card'
import { withPublic } from '../hook/route'
import nookies from 'nookies'


export async function getServerSideProps(context) {
  try {
    const token = nookies.get(context, "__session")
    const response = await fetch('http://192.168.15.12:8000/providers',
      {
        headers: {
          'Authorization': `Bearer ${token["__session"]}`
        }
      }
    )
    const users = await response.json()
    
    return {
      props: {
        users
      }, // will be passed to the page component as props
    }
  } catch (error) {
    return {
      props: {

      }
    }
  }

}

const serviceProviders = ({ auth, pathname, users }) => {

  return (
    <>
     <div className='mt-10 px-4'>
      <div className='flex justify-center items-center'>
        <h1 className='text-5xl font-extrabold'>Salve, salve</h1>
      </div>
      <div className='flex justify-center items-center'>
        <h1 className='text-5xl font-extrabold' >Sea benvenido</h1>
      </div>
      <div className='flex justify-center items-center'>
        <p>Somos uma plataforma de </p>
      </div>
     </div>
    </>
  )
}


export default withPublic(serviceProviders)
