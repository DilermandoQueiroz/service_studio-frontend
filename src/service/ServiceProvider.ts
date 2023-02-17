import { Store } from 'react-notifications-component';
import { AuthService} from './AuthService'
import { ServiceProviderCreateFirebase } from '../types/ServiceProvider'
import nookies from 'nookies'

export const ServiceProvider = {

	createWithEmailAndPassword: async (data: ServiceProviderCreateFirebase) => {
        data.email = data.email.toLocaleLowerCase()

        try {
            const response = await fetch('/api/provider/create', {
                method: 'POST',
                body: JSON.stringify(data)
            })
            const jsonResponse = await response.json()

            Store.addNotification(
                {
                    title: response.status == 201 ? 'Usuário Cadastrado'  : 'Error' ,
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

    loginWithEmailAndPassword: async (email, password) => {
        const response = await AuthService.signInUserWithEmailAndPassword(email, password)

        if (response.success) {
            if (response.userCred.user.emailVerified) {
                return true
            }
            else {
                Store.addNotification({ 
                    title: "warning",
                    message: "Email não validado",
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
                AuthService.sendEmailVerification(response.userCred.user)
                return false
            }
        }
        else {
            Store.addNotification({ 
                title: "Error",
                message: response.error.code,
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
    }, 

    resetPasswordWithEmail: async (email) => {
        AuthService.resetPassword(email)
    },

    removeServiceProvider: async () => {
        try {
            const response = await fetch('/api/provider/remove', {
                method: 'get',
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
};