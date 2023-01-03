import { Store } from 'react-notifications-component';
import nookies from 'nookies'
import { SellCreate } from '../types/Sell';

export async function createSellDb(data) {
  const dataCreateSell: SellCreate = {
    studio_id: null,
    client_email: data.client_email,
    actual_session: 1,
    price: data.price,
    start_time: data.start_time,
    scheduled_time: data.scheduled_time,
    description: data.description,
    finished: false
  }
  dataCreateSell.start_time = new Date().toISOString()
  dataCreateSell.price = parseFloat(Math.ceil(data.price).toFixed(1))
  console.log(dataCreateSell)
  try {
    const response = await fetch('/api/sell/create', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${nookies.get(null, "__session")["__session"]}`,
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(dataCreateSell)
    })
    const jsonResponse = await response.json()

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

    if (response.ok) {
      return true
    }

    return false
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
    return false
  }
}

export async function sellConfirm(submit, setSellData) {
  try {
    const response = await fetch('/api/client/' + submit.client_email, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${nookies.get(null, "__session")["__session"]}`,
        "Access-Control-Allow-Origin": "*"
      }
    })

    const data = await response.json();

    if (response.ok) {
      if (!submit.start_time) {
        submit.start_time = new Date().toISOString()
      } else {
        submit.start_time = new Date(submit.start_time).toISOString()
      }

      setSellData((prevState) => ({
        ...prevState,
        client_display_name: data.display_name,
        client_email: submit.client_email,
        price: submit.price,
        description: submit.description,
        start_time: submit.start_time,
        scheduled_time: submit.scheduled_time
      }))

      return true
    } else {
      Store.addNotification({
        title: "Error",
        message: "Email do cliente não existe",
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
      return false
    }
  }
  catch (error) {
    console.log(error)
  }

}

export async function sellDelete(sellID) {
  try {
    const response = await fetch('/api/sell/remove/' + sellID, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${nookies.get(null, "__session")["__session"]}`,
        "Access-Control-Allow-Origin": "*"
      }
    })
    
    if (response.ok) {
      return true
    }
    
    return false
  }
  catch (error) {
    console.log(error)
  }
}