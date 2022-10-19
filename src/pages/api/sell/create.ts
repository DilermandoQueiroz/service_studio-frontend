async function createSellAPI(req, res) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_ROUTE +
                                 'sell/create', {
        method: 'POST',
        headers: {
        "Content-Type": "application/json",
        'Authorization': req.headers.authorization,
        "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(req.body)
    })

    res.status(response.status).json(await response.json())
}

export default createSellAPI