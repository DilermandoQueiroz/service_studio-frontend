import { IPostClient } from '../types/index'
import { v4 as uuidv4 } from 'uuid';
import { Store } from 'react-notifications-component';
import nookies from 'nookies'

export const Client = {

    createClient: async (data: IPostClient) => {

        data.name = uuidv4()
        data.birth_date = new Date(data.birth_date).toISOString().split('T')[0]
        data.email = data.email.toLocaleLowerCase()
        try {
            const response = await fetch('http://0.0.0.0:8080/client/create', {
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
                        title: response.status == 201 ? 'Cliente Cadastrado' : 'Error',
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
                        title: response.status == 201 ? 'Cliente Cadastrado' : 'Error',
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