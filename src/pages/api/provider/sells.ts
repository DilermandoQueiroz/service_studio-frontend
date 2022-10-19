export async function getAllSellsData( authorization ) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_ROUTE + 'provider/sells', {
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
    const response = await getAllSellsData(req.headers.authorization)
    res.status(response.status).json(await response.json())
}


export default getAllClients