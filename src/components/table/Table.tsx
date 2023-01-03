import { useState } from "react";
import { sellDelete } from "../../service/Sell"

export function TableClients({ props, children }) {
    return (
      <>
        <div className="border-black border-2 overflow-x-auto relative m-4 rounded-lg shadow-md">
          <table className="w-full text-sm text-left text-black-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                  <th scope="col" className="py-3 px-6">
                      Nome cliente
                  </th>
                  <th scope="col" className="py-3 px-6">
                      Email
                  </th>
                  <th scope="col" className="py-3 px-6">
                      Numero de telefone
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
                                <th className="py-4 px-6 ">
                                {client.phone_number}
                                </th>
                            </tr>
                        </>
                    ))
                  }
            </tbody>
          </table>
        </div>
        {children}
      </>
    )
}

export function TableSells({ props, children }) {

  const [list, setList] = useState(props.sells);
  
  function remove(client) {
    const response = sellDelete(client.Sell.id)
    
    if (response) {
      const newList = list.filter((client_var) => client_var !== client);

      setList(newList);
    }
  }

    return (
      <>
        <div className="border-black border-2 overflow-x-auto relative m-4 rounded-lg shadow-md">
            <table className="w-full text-sm text-left text-black-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="py-3 px-6">
                        Email do cliente
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Nome                     
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
                    <th scope="col" className="py-3 px-6">
                        Finalizado
                    </th>
                </tr>
              </thead>
              <tbody>
                    {
                      list.map((client) => (
                        <>
                              <tr className="bg-white border-b">
                                  <th scope="row" className="py-4 px-6">
                                  {client.email}
                                  </th>
                                  <th scope="row" className="py-4 px-6">
                                  {client.display_name}
                                  </th>
                                  <th className="py-4 px-6 ">
                                  {client.Sell.price}
                                  </th>
                                  <th className="py-4 px-6 ">
                                  {client.Sell.actual_session}
                                  </th>
                                  <th className="py-4 px-6 ">
                                  {client.Sell.start_time}
                                  </th>
                                  <th className="py-4 px-6 ">
                                  {client.Sell.scheduled_time}
                                  </th>
                                  <th scope="row" className="py-4 px-6">
                                  {client.Sell.finished}
                                  </th>
                                  <th scope="row" className="py-4 px-6">
                                    <div className="cursor-pointer button-movement text-red-500" onClick={() => remove(client)}>
                                      deletar
                                    </div>
                                  </th>
                              </tr>
                          </>
                      ))
                    }
              </tbody>
            </table>
          </div>
          {children}
        </>
      )
}