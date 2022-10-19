export function TableClients({ props }) {
    return (
        <div className="overflow-x-auto relative m-4 rounded-lg shadow-md">
          <table className="w-full text-sm text-left text-black-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                  <th scope="col" className="py-3 px-6">
                      Nome cliente
                  </th>
                  <th scope="col" className="py-3 px-6">
                      Email
                  </th>
              </tr>
            </thead>
            <tbody>
                  {
                    props.clients.map((client) => (
                        <>
                            <tr className="bg-white border-b">
                                <th scope="row" className="py-4 px-6">
                                {client.display_name}
                                </th>
                                <th className="py-4 px-6 ">
                                {client.email}
                                </th>
                            </tr>
                        </>
                    ))
                  }
            </tbody>
          </table>
        </div>
      )
}

export function TableSells({ props }) {
    return (
        <div className="overflow-x-auto relative m-4 rounded-lg shadow-md">
          <table className="w-full text-sm text-left text-black-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                  <th scope="col" className="py-3 px-6">
                      Email do cliente
                  </th>
                  <th scope="col" className="py-3 px-6">
                      Preço
                  </th>
                  <th scope="col" className="py-3 px-6">
                      Numero de sessões
                  </th>
                  <th scope="col" className="py-3 px-6">
                      Cadastro
                  </th>
                  <th scope="col" className="py-3 px-6">
                      Próxima sessão
                  </th>
              </tr>
            </thead>
            <tbody>
                  {
                    props.sells.map((client) => (
                        <>
                            <tr className="bg-white border-b">
                                <th scope="row" className="py-4 px-6">
                                {client.client_name}
                                </th>
                                <th className="py-4 px-6 ">
                                {client.price}
                                </th>
                                <th className="py-4 px-6 ">
                                {client.number_of_sessions}
                                </th>
                                <th className="py-4 px-6 ">
                                {client.start_time}
                                </th>
                                <th className="py-4 px-6 ">
                                {client.last_update}
                                </th>
                            </tr>
                        </>
                    ))
                  }
            </tbody>
          </table>
        </div>
      )
}