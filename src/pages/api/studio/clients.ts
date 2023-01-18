export async function getAllStudioClientsData( authorization ) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_ROUTE + 'studio/clients', {
        method: 'Get',
        headers: { 
            "Content-Type": "application/json",
            'Authorization': authorization,
            "Access-Control-Allow-Origin": "*"
        }
    })
    return response
}

export default getAllStudioClientsData