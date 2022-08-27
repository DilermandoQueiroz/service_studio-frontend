import { json } from 'stream/consumers';
import {IPostClient} from '../types/index'
import { v4 as uuidv4 } from 'uuid';
import { Store } from 'react-notifications-component';

export const Client = {

	createClient: async (data: IPostClient) => {

        data.name = uuidv4()
        data.birth_date = new Date(data.birth_date).toISOString().split('T')[0]
        try {
            const response = await fetch('http://localhost:8000/client/create', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            console.log(data )
            const jsonResponse = await response.json()
            
            Store.addNotification(
                {
                    title: response.status == 201 ? 'Usuário'  : 'Error' ,
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
            return response.ok
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