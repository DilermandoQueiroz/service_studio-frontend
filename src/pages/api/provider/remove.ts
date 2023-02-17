async function removeServiceProvider( req, res ) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_ROUTE + 'provider/remove', {
        method: 'get',
        headers: { 
            "Content-Type": "application/json",
            'Authorization': req.headers.authorization,
            "Access-Control-Allow-Origin": "*" 
        },
    })
    return response
}

export default removeServiceProvider