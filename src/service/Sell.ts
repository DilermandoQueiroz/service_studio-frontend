import { IPostRegisterSell } from '../types/index'
import { v4 as uuidv4 } from 'uuid';
import { Store } from 'react-notifications-component';
import { AuthService } from './AuthService'
import nookies from 'nookies'

export const Sell = {

  createSell: async (data: IPostRegisterSell, email) => {

    data.start_time = new Date().toISOString()
    data.service_provider_name = email
    data.price = parseFloat(Math.ceil(data.price).toFixed(1))

    console.log(data)
    try {
      const response = await fetch('http://192.168.15.12:8000/sell/create', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${nookies.get(null, "__session")["__session"]}`,
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data)
      })
      const jsonResponse = await response.json()
      if (response.ok) {

        Store.addNotification(
          {
            title: response.status == 201 ? 'Usuário' : 'Error',
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
            title: response.status == 201 ? 'Usuário' : 'Error',
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

  },

};