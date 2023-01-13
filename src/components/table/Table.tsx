import { useState } from "react";
import { sellDelete } from "../../service/Sell"
import { Connect } from "../../service/LinkStudioServiceProvider"

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
                                  {new Date(client.Sell.start_time).toLocaleString()}
                                  </th>
                                  <th className="py-4 px-6 ">
                                  {new Date(client.Sell.scheduled_time).toLocaleString()}
                                  </th>
                                  <th scope="row" className="py-4 px-6">
                                  {client.Sell.finished ? "finalizado" : <p className="text-green-500">em aberto</p>}
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

export function TableStudio({ props, children }) {

  const [list, setList] = useState(props.studios);

  function remove(item) {
    const response = Connect.delete(item.StudioServiceProvider.id)
    
    if (response) {
      const newList = list.filter((item_var) => item_var !== item);

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
                    Nome                     
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Email
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Pedido
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Deletar
                  </th>
              </tr>
            </thead>
            <tbody>
                  {
                    list.map((studio) => (
                      <>
                            <tr className="bg-white border-b">
                                <th scope="row" className="py-4 px-6">
                                  {studio.Studio.display_name}
                                </th>
                                <th scope="row" className="py-4 px-6">
                                  {studio.Studio.email_studio}
                                </th>
                                <th className="py-4 px-6 ">
                                  {studio.StudioServiceProvider.studio_accept ? <p className="text-green-500">aceitado</p>: <p className="text-red-500">em aberto</p>}
                                </th>
                                <th scope="row" className="py-4 px-6">
                                  <div className="cursor-pointer button-movement text-red-500" onClick={() => remove(studio)}>
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

export function TableServiceProvider({ props, children }) {

  const [list, setList] = useState(props.serviceProvider);
  
  function remove(item) {
    const response = Connect.delete(item.StudioServiceProvider.id)
    
    if (response) {
      const newList = list.filter((item_var) => item_var !== item);

      setList(newList);
    }
  }

  function accept(item) {
    const response = Connect.update(item.StudioServiceProvider.id)

  }

    return (
      <>
        <div className="border-black border-2 overflow-x-auto relative m-4 rounded-lg shadow-md">
            <table className="w-full text-sm text-left text-black-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="py-3 px-6">
                      Nome                     
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Email
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Situação tatuador
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Situação estudio
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Deletar
                    </th>
                </tr>
              </thead>
              <tbody>
                    {
                      list.map((connect) => (
                        <>
                              <tr className="bg-white border-b">
                                  <th scope="row" className="py-4 px-6">
                                    {connect.Person.display_name}
                                  </th>
                                  <th scope="row" className="py-4 px-6">
                                    {connect.Person.email}
                                  </th>
                                  <th className="py-4 px-6 ">
                                    {connect.StudioServiceProvider.service_provider_accept ? <p className="text-green-500">Aceitado</p> : <p className="text-red-500">em aberto</p>}
                                  </th>
                                  <th className="py-4 px-6 ">
                                    {connect.StudioServiceProvider.studio_accept ? <p className="text-green-500">Aceitado</p> : <div className="text-green-500 button-movement cursor-pointer" onClick={() => accept(connect)}>Aceitar</div>}
                                  </th>
                                  <th scope="row" className="py-4 px-6">
                                    <div className="cursor-pointer button-movement text-red-500" onClick={() => remove(connect)}>
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