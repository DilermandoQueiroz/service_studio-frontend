import React from 'react'
import { withPublic } from '../../hook/route'

const Home = ({auth, pathname}) => {
  const {user} = auth
  return (
    <div className='mt-10 px-4 text-center justify-center items-center'>
      <h1>Seja Bem vindo</h1>
      <br />
      <h2>{user.displayName}</h2>
    </div>
  )
}

export default withPublic(Home)