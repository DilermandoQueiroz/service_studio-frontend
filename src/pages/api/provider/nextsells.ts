export async function getNextSells( authorization ) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_ROUTE + 'provider/nextsells', {
        method: 'Get',
        headers: { 
            "Content-Type": "application/json",
            'Authorization': authorization,
            "Access-Control-Allow-Origin": "*"
        }
    })
    return response
}