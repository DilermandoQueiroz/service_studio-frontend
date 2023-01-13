import { Store } from 'react-notifications-component';
import { StudioCreate } from '../types/Studio';
import nookies from 'nookies'

export const Studio = {

	createStudio: async (data: StudioCreate) => {
        data.email_studio = data.email_studio.toLocaleLowerCase()

        try {
            const response = await fetch('/api/studio/create', {
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
                    title: response.status == 201 ? 'Estúdio cadastrado'  : 'Error' ,
                    message: response.status == 422 ? "Email já registrado" : jsonResponse.detail,
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
}