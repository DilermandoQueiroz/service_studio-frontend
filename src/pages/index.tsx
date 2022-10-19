import React, { useState, useEffect, useCallback, useRef } from 'react'
import { withPublic } from '../hook/route'

const serviceProviders = () => {

  return (
    <>
     <div className='mt-10 px-4'>
      <div className='flex justify-center items-center'>
        <h1 className='text-5xl font-extrabold'>Página de incio</h1>
      </div>
      <div className='flex justify-center items-center'>
        <h1 className='text-5xl font-extrabold' >Em construção</h1>
      </div>
     </div>
    </>
  )
}


export default withPublic(serviceProviders)
