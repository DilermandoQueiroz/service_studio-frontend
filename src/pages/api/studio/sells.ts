export async function getAllStudioSellsData( authorization ) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_ROUTE + 'studio/sells', {
        method: 'Get',
        headers: { 
            "Content-Type": "application/json",
            'Authorization': authorization,
            "Access-Control-Allow-Origin": "*"
        }
    })
    return response
}

export default getAllStudioSellsData