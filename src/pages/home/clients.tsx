// import React, { useState, useEffect, useCallback, useRef } from 'react'
// import { ClientCard } from '../../components/ClientCard'
// import { withProtected } from '../../hook/route'
// import nookies from 'nookies'

import { withProtected } from "../../hook/route"



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


// export default withProtected(ClientsProvider)
function ClientsProvider() {
  return (
    <div>clients</div>
  )
}

export default withProtected(ClientsProvider)
