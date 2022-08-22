import React, { useState, useEffect, useCallback, useRef } from 'react'
import { ServiceProviderCard } from '../../components/Card'
import { withPublic } from '../../hook/route'
import nookies from 'nookies'



export async function getServerSideProps(context) {
    const token = nookies.get(context, "__session")
    const response = await fetch('http://localhost:8000/providers',
        {
            headers: {
                'Authorization': `Bearer ${token["__session"]}`
            }
        }
    )
    const users = await response.json()
    console.log(users)
    return {
        props:{ 
            users
        }, // will be passed to the page component as props
    }
  }

const serviceProviders = ({auth, pathname, users}) => {
    
    
    // const effectRan = useRef(false)
    // const { user, error } = auth;
    // const [users, setUsers] = useState([]);
    // const [isLoading, setLoading] = useState(false)


    // useEffect(() => {
    //     getServiceProviders()
    //     return () => {
    //         effectRan.current = true
    //     }
    // }, []);

    // const  getServiceProviders = useCallback ( async () => {
    //     if(effectRan.current === false) {
    //         setLoading(true)
           
    //         setLoading(false)
    //     }
        
    // }, [])

    

    return (
        <>

        {
            users?.map((user) => (
                <div key={user.name} className="container sm:mx-auto">
                    <ServiceProviderCard user={user}></ServiceProviderCard>
                </div>
            ))
        }
        </>
        
    )
}


export default withPublic(serviceProviders)
