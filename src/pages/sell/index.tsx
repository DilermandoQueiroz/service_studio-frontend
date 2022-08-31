import React from 'react'
import { withProtected } from '../../hook/route'
import nookies from 'nookies'
import { SellCard } from '../../components/SellCard'

export async function getServerSideProps(context) {
  try {
    const token = nookies.get(context, "__session")
    const response = await fetch('http://192.168.15.12:8000/sell_by_email',
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

const Home = ({ auth, pathname, users }) => {
  const { user } = auth
  return (
    <>
      <div className='mt-10 px-4 flex justify-center items-center'>
       

          <SellCard users={users} />

        
      </div>
    </>
  )
}

export default withProtected(Home)