import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Home } from '../components/home'
import { withPublic } from '../hook/route'

const serviceProviders = () => {

  return (
    <div>
      <Home></Home>
    </div>
  )
}


export default withPublic(serviceProviders)
