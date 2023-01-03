async function createClientUsingAPI(req, res) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_ROUTE + 'person/create', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: req.body
    })
    res.status(response.status).json(await response.json())
}

export default createClientUsingAPI