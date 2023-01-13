async function updateConnection(req, res) {
    const { id } = req.query

    const response = await fetch(process.env.NEXT_PUBLIC_API_ROUTE +
                                 'link/' + id, {
        method: 'PUT',
        headers: {
        "Content-Type": "application/json",
        'Authorization': req.headers.authorization,
        "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(req.body)
    })

    res.status(response.status).json(await response.json())
}

export default updateConnection