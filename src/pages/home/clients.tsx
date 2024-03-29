// import React, { useState, useEffect, useCallback, useRef } from 'react'
// import { ClientCard } from '../../components/ClientCard'
// import { withProtected } from '../../hook/route'
// import nookies from 'nookies'
import { withProtected } from "../../hook/route"
import { getAllClientsData } from "../api/provider/clients";
import nookies from 'nookies'
import { TableClients } from "../../components/table/Table";
import { useRouter } from "next/router";
import { LinkText } from "../../components/LinkText";

// export async function getServerSideProps(context) {
//   try {
//     const token = nookies.get(context, "__session")
//     const response = await fetch('http://192.168.15.12:8000/get_provider_clients',
//       {
//         headers: {
//           'Authorization': `Bearer ${token["__session"]}`
//         }
//       }
//     )
//     const users = await response.json()
    
//     return {
//       props: {
//         users
//       }
//     }
//   } catch (error) {
//     console.log(error)
//   }

// }

// const ClientsProvider = ({ auth, pathname, users }) => {
  
//   return (
//     <>
//       <div className='mt-10 px-4 flex justify-center items-center'>
//         <ul className='container lg:mx-auto max-w-md'>
//           {
//             users?.map((user) => (
//               <li key={user.name}>
//                 <div>
//                   <ClientCard user={user}></ClientCard>
//                 </div>
//               </li>
//             ))
//           }
//         </ul>
//       </div>
//     </>
//   )
// }
export async function getServerSideProps(context) {
  const token = nookies.get(context, "__session")
  const response = await getAllClientsData(`Bearer ${token["__session"]}`)
  const clients = await response.json()

  return {
    props: { clients }
  }
}

function ClientsProvider(props) {
  
  const router = useRouter()

  return (
    <TableClients props={props}>
      <LinkText text='voltar' handleOnChange={() => {router.push('/home')}}></LinkText>
    </TableClients>
  )
}

export default withProtected(ClientsProvider)