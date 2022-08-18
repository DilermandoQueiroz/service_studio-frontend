import Head from 'next/head'
import React from 'react'
import { ServiceProviderCard } from '../../components/Card'
// import { useAuth } from '../../context/AuthContext'


// const getUser = async () => {
//     const { user } = useAuth()
//     return user.getIdToken()
// }

export async function getServerSideProps() {
    const response = await fetch('http://localhost:8000/users')
    const users = await response.json()
    // const token = await getUser()
    // console.log(token)
    return {
        props: { users }
    }
}

export default function Home({ users }) {

    return (
        <>
            <div>
                <div className="grid gap-4 grid-cols-2 grid-rows-2 ms-1">
                    {users.map((user) => (
                        <div key={user.name} className="container sm:mx-auto">
                            <ServiceProviderCard user={user}></ServiceProviderCard>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
