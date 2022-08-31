import Link from 'next/link'
import React from 'react'
import { withPublic } from '../../hook/route'

const Home = ({auth, pathname}) => {
  const {user} = auth
  return (
    <div className='mt-10 px-4 text-center justify-center items-center'>
      <h1>Seja Bem vindo</h1>
      <br />
      <h2>{user.displayName}</h2>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Link href="/serviceprovider/clients">
          <button className='inline-flex p-3 bg-black rounded lg:hidden text-white ml-auto outline-none mr-2.5'>
            Meus Clientes
          </button>
      </Link>
    </div>
  )
}

export default withPublic(Home)