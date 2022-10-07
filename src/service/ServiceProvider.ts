import {IPostProvider} from '../types/index'
import { v4 as uuidv4 } from 'uuid';
import { Store } from 'react-notifications-component';
import { AuthService} from './AuthService'
import { FormResetPassword } from '../components/form/Forms';

export const ServiceProvider = {

	createWithEmailAndPassword: async (data: IPostProvider) => {
        
        data.email = data.email.toLocaleLowerCase()
        try {
            const response = await fetch('http://0.0.0.0:8080/provider/create', {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*" 
                },
                body: JSON.stringify(data)
            })
            const jsonResponse = await response.json()

            if(response.ok) {
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
                ServiceProvider.loginWithEmailAndPassword(data.email, data.password)
                return true
            } else {
                Store.addNotification(
                    {
                        title: response.status == 201 ? 'Usuário'  : 'Error' ,
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
                return false
            }
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
    }
};