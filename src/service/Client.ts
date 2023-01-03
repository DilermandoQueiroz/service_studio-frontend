import { v4 as uuidv4 } from 'uuid';
import { Store } from 'react-notifications-component';
import { ClientCreate } from '../types/Client';

export const Client = {

    createClient: async (data: ClientCreate) => {
        data.email = data.email.toLocaleLowerCase()

        try {
            const response = await fetch('/api/client/create', {
                method: 'POST',
                body: JSON.stringify(data)
            })
            const jsonResponse = await response.json()

            Store.addNotification(
                {
                    title: response.status == 201 ? 'Cliente Cadastrado' : 'Error',
                    message: response.status == 422 ? jsonResponse.detail : '',
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