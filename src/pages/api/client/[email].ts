async function getClientNameAPI(req, res) {
    const { email } = req.query

    const response = await fetch(process.env.NEXT_PUBLIC_API_ROUTE +
                                 'person/?email=' + email.toLowerCase(), {
        method: 'GET',
        headers: {
        "Content-Type": "application/json",
        'Authorization': req.headers.authorization,
        "Access-Control-Allow-Origin": "*"
        } 
    })

    res.status(response.status).json(await response.json())
}

export default getClientNameAPI