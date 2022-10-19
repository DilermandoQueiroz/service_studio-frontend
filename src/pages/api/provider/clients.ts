export async function getAllClientsData( authorization ) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_ROUTE + 'provider/clients', {
        method: 'Get',
        headers: { 
            "Content-Type": "application/json",
            'Authorization': authorization,
            "Access-Control-Allow-Origin": "*"
        }
    })
    return response
}

async function getAllClients(req, res) {
    const response = await getAllClientsData(req.headers.authorization)
    res.status(response.status).json(await response.json())
}


export default getAllClients