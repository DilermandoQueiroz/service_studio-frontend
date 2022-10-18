async function createServiceProviderUsingAPI(req, res) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_ROUTE + 'provider/create', {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*" 
        },
        body: req.body
    })
    res.status(response.status).json(await response.json())
}

export default createServiceProviderUsingAPI