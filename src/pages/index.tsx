import React, { useState, useEffect, useCallback, useRef } from 'react'
import { ServiceProviderCard } from '../components/Card'
import { withPublic } from '../hook/route'
import nookies from 'nookies'
import { Button } from "@material-tailwind/react";



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
    console.log(users)
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
    <Button>opa</Button>
      <div className='mt-10 px-4 flex justify-center items-center'>
        <ul className='container lg:mx-auto max-w-md'>
          {
            users?.map((user) => (
              <li key={user.name}>
                <div>
                  <ServiceProviderCard user={user}></ServiceProviderCard>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}


export default withPublic(serviceProviders)
