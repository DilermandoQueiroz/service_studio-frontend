import { Store } from 'react-notifications-component';
import { RequestServiceProvider, RequestStudio } from '../types/LinkStudioServiceProvider';
import nookies from 'nookies'

export const Connect = {

	serviceProvider: async (data: RequestServiceProvider) => {
        data.email_studio = data.email_studio.toLocaleLowerCase()

        try {
            const response = await fetch('/api/connect/request_provider', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${nookies.get(null, "__session")["__session"]}`,
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(data)
            })
            const jsonResponse = await response.json()

            Store.addNotification(
                {
                    title: response.status == 200 ? 'Pedido Enviado'  : 'Error' ,
                    message: response.status == 422 ? "Email não existe" : jsonResponse.detail,
                    type: response.ok ? "success" : "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated animate__fadeIn"],
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
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                    duration: 2500,
                    showIcon: true
                }
            })
        }
	},

    delete: async (id) => {
        try {
            const response = await fetch('/api/connect/remove/' + id, {
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
    },

    update: async (id) => {
        try {
            const data = {
                "studio_accept": true,
                "service_provider": true,
                "comission": 0
            }
            const response = await fetch('/api/connect/update/' + id, {
              method: 'PUT',
              headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${nookies.get(null, "__session")["__session"]}`,
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify(data)
            })
            
            if (response.ok) {
              return true
            }
            
            return false
          }
          catch (error) {
            console.log(error)
          }
    },

    studio: async (data: RequestStudio) => {
        data.email_service_provider = data.email_service_provider.toLocaleLowerCase()

        try {
            const response = await fetch('/api/connect/request_studio', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${nookies.get(null, "__session")["__session"]}`,
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(data)
            })
            const jsonResponse = await response.json()

            Store.addNotification(
                {
                    title: response.status == 200 ? 'Pedido Enviado'  : 'Error' ,
                    message: response.status == 422 ? "Email não existe" : jsonResponse.detail,
                    type: response.ok ? "success" : "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated animate__fadeIn"],
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
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                    duration: 2500,
                    showIcon: true
                }
            })
        }
	}
}