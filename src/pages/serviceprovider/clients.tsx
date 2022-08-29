import React, { useState, useEffect, useCallback, useRef } from 'react'
import { ServiceProviderCard } from '../../components/Card'
import { withProtected } from '../../hook/route'
import nookies from 'nookies'



export async function getServerSideProps(context) {
  try {
    const token = nookies.get(context, "__session")
    const response = await fetch('http://localhost:8000/sell_by_email',
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

const ClientsProvider = ({ auth, pathname, users }) => {

  return (
    <>
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


export default withProtected(ClientsProvider)
