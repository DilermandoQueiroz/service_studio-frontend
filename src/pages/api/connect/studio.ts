async function getServiceProvider( authorization ) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_ROUTE +
                                 'link/studio', {
        method: 'get',
        headers: {
        "Content-Type": "application/json",
        'Authorization': authorization,
        "Access-Control-Allow-Origin": "*"
        },
    })

    return response
}

export default getServiceProvider