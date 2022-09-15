import React, { useState } from 'react'
import { withPublic } from '../hook/route'
import { FormInput } from '../components/form/FormInput'
import { FormButton } from '../components/form/FormButton'
import {FormClient, FormLogin} from '../components/form/Forms'
import { Link } from '../components/Link'
import { FormTitle } from '../components/form/FormTitle'
import { signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../config/firebase'

const createServiceProvider = async (event) => {
    event.preventDefault()

    const data = {
        email: event.target.email.value,
        password: event.target.password.value,
        display_name: event.target.name.value,
    }
    const JSONdata = JSON.stringify(data)
 
    const endpoint = 'http://192.168.0.15:8080/provider/create'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSONdata,
    }
    try {
        const response = await fetch(endpoint, options)
        if (response.status == 201) {
            signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user.emailVerified) {
                    console.log("verificado")
                }
                else {
                    sendEmailVerification(auth.currentUser)
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
}

const login = () => {
    const [page, setPage] = useState('login');

    const loginServiceProvider = async (event) => {
        event.preventDefault()
    
        const data = {
            email: event.target.email.value,
            password: event.target.password.value,
        }
    
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user.emailVerified) {
                console.log("verificado")
            }
            else {
                setPage("confirmEmail")
                sendEmailVerification(user)
                .then(() => {
                    console.log("enviado")
                })
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });
    }

    const resetPassword = async (event) => {
        event.preventDefault()

        const data = {
            email: event.target.email.value
        }

        sendPasswordResetEmail(auth, data.email)
        .then(() => {
            setPage('confirm')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
        setPage('confirm')
    }

    const login = () => {
        return (
            <div className='m-4 px-4 flex justify-center items-center pt-20'>
                <form className='bg-white container lg:mx-auto max-w-sm border-black border-2 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={loginServiceProvider}>
                    <FormTitle text='Logar'/>
                    <FormInput text='Email' type='text' id='email'/>
                    <FormInput text='Senha' type='text' id='password'/>
                    <FormButton text='Logar' type='submit'/>
                    <Link text='Não possui conta? Crie uma' handleOnChange={() => setPage('create')}/>
                    <Link text='Esqueceu sua senha?' handleOnChange={() => setPage('reset')}/>
                </form>
            </div>
        )
    }

    const create = () => {
        return (
            <div className='m-4 px-4 flex justify-center items-center pt-20'>
                <form className='container lg:mx-auto max-w-sm border-black border-2 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={createServiceProvider}>
                   
                </form>
            </div>
        )
    }

    const reset = () => {
        return (
            <div className='m-4 px-4 flex justify-center items-center pt-20'>
                <form className='container lg:mx-auto max-w-sm border-black border-2 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={resetPassword}>
                    <FormTitle text='Entre com seu email para resetar a senha' />
                    <FormInput type='text' placeholder='Email' id='email'/>
                    <FormButton text='Resetar Senha' type='submit'/>
                    <Link text="Cancelar" handleOnChange={() => setPage('login')}/>
                </form>
            </div>
        )
    }

    const confirm = () => {
        return (
            <div className='m-4 px-4 flex justify-center items-center pt-20'>
                <div className='container lg:mx-auto max-w-sm border-black border-2 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4'>
                    <div className='mb-4 flex'>
                        <h1 className='text-left text-xl pb-6'>
                            Se uma conta existir com o email informado,
                            você recebera um email com as instruções sobre como resetar sua senha.
                            Se não chegar, verifique sua caixa de spam.
                        </h1>
                    </div>
                    <Link text="Volte para logar" handleOnChange={() => setPage('login')}/>
                </div>
            </div>
        )
    }

    const terms = () => {
        return (
            <div className='m-4 px-4 flex justify-center items-center pt-20'>
                <div className='max-w-2xl'>
                    <div className='mb-4 flex'>
                        <h1 className='text-center text-4xl font-bold pb-6'>Termos de serviço</h1>
                    </div>
                    <div className='mb-4 flex'>
                        <h1 className='text-left text-xl pb-6'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                        containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
                        including versions of Lorem Ipsum.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                        containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
                        including versions of Lorem Ipsum.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                        containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
                        including versions of Lorem Ipsum.
                        </h1>
                    </div>
                    <button onClick={() => setPage('create')} className='font-bold text-sky-500 w-full p-2.5'>
                        Criar
                    </button>
                </div>
            </div>
        )
    }

    const handleFunction = () => {
        // setLoading(true)
        // console.log(getValues("email"))
        // console.log(errors)
        console.log("my function") 
        // setLoading(false)
    }

    switch(page) {
        case 'login':
            return (
                <FormLogin> 
                    <Link text='Não possui conta? Crie uma' handleOnChange={() => setPage('create')}/>
                    <Link text='Esqueceu sua senha?' handleOnChange={() => setPage('reset')}/>
                </FormLogin>
            ) 

        case 'create':
            return create()
        case 'reset':
            return reset()
        case 'confirm':
            return confirm()
        case 'terms':
            return terms()
    }
}


export default withPublic(login)