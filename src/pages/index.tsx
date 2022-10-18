import React, { useState, useEffect, useCallback, useRef } from 'react'
import { withPublic } from '../hook/route'

const serviceProviders = () => {

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
