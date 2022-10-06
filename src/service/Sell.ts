import { IPostRegisterSell } from '../types/index'
import { Store } from 'react-notifications-component';
import nookies from 'nookies'
import { AuthService } from './AuthService';

export async function createSellDb(data) {
  let serviceProviderEmail = await AuthService.getEmail();

  const dataCreateSell = {
    client_name: data.client_email,
    service_provider_name: serviceProviderEmail,
    number_of_sessions: data.number_of_sessions,
    price: data.price,
    start_time: data.start_time,
    last_update: data.last_update,
    description: data.description
  }

  dataCreateSell.start_time = new Date().toISOString()
  dataCreateSell.price = parseFloat(Math.ceil(data.price).toFixed(1))

  try {
    const response = await fetch('http://0.0.0.0:8080/sell/create', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${nookies.get(null, "__session")["__session"]}`,
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(dataCreateSell)
    })

    const jsonResponse = await response.json()
    if (response.ok) {

      Store.addNotification(
        {
          title: response.status == 201 ? 'Venda criada' : 'Error',
          message: response.status == 422 ? "Verifique os parametros enviados" : jsonResponse.detail,
          type: response.ok ? "success" : "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
          animationOut: ["animate__animated animate__fadeOut"],
          dismiss: {
            duration: 2500,
            showIcon: true
          }
        },
      )
      return true
    } else {
      Store.addNotification(
        {
          title: response.status == 201 ? 'Venda criada' : 'Error',
          message: response.status == 422 ? "Verifique os parametros enviados" : jsonResponse.detail,
          type: response.ok ? "success" : "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
          animationOut: ["animate__animated animate__fadeOut"],
          dismiss: {
            duration: 2500,
            showIcon: true
          }
        },
      )
      return false
    }
  } catch (error) {
    Store.addNotification({
      title: "Error",
      message: "Não foi possível realizar sua requisição, tente novamente mais tarde",
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
      animationOut: ["animate__animated animate__fadeOut"],
      dismiss: {
        duration: 2500,
        showIcon: true
      }
    })
    console.log(error)
  }
}

export async function sellConfirm(submit, setSellData) {
  const options = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${nookies.get(null, "__session")["__session"]}`,
      "Access-Control-Allow-Origin": "*"
    }
  }
  const endpoint = 'http://0.0.0.0:8080/client/name?email=' + submit.client_name
  try {
    const response = await fetch(endpoint, options)
    const data = await response.json();

    if (!submit.last_update) {
      submit.last_update = new Date().toISOString()
    }
    
    setSellData((prevState) => ({
      ...prevState,
      client_email: submit.client_name,
      client_display_name: data.display_name,
      price: submit.price,
      number_of_sessions: submit.number_of_sessions,
      studio_name: submit.studio_name,
      description: submit.description,
      last_update: submit.last_update,
    }))
  }
  catch (error) {
    console.log(error)
  }
  
}