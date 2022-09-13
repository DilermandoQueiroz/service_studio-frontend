import React, { useState } from 'react'
import { withPublic } from '../hook/route'
import { FormInput } from '../components/form/FormInput'
import { FormButton } from '../components/form/FormButton'
import { Link } from '../components/Link'
import { FormTitle } from '../components/form/FormTitle'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase'

const createServiceProvider = async (event) => {
    event.preventDefault()

    const data = {
        email: event.target.email.value,
        password: event.target.password.value,
        display_name: event.target.name.value,
        birth_date: "2022-09-10",
        phone_number: "+5511985760122",
        cpf: "123123321",
        description: "ola estou testando"
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
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });
    }

    if (page == 'login') {
        return (
            <div className='m-4 px-4 flex justify-center items-center pt-20'>
                <form className='container lg:mx-auto max-w-sm border-black border-2 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={loginServiceProvider}>
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
    else if (page == 'create') {
        return (
            <div className='m-4 px-4 flex justify-center items-center pt-20'>
                <form className='container lg:mx-auto max-w-sm border-black border-2 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={createServiceProvider}>
                    <FormTitle text='Tatuador' />
                    <FormInput text='Email' type='text' id='email'/>
                    <FormInput text='Senha' type='text' id='password'/>
                    <FormInput text='Nome' type='text' id='name'/>
                    <FormButton text='Criar conta' type='submit'/>
                    <Link text='Você já possui conta? Logar' handleOnChange={() => setPage('login')}/>
                    <Link text='Clicando em "Criar conta" você está de acordo com os Termos de Serviço' handleOnChange={() => setPage('terms')}/>
                </form>
            </div>
        )
    }
    else if (page == 'reset') {
        return (
            <div className='m-4 px-4 flex justify-center items-center pt-20'>
                <form className='container lg:mx-auto max-w-sm border-black border-2 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4'>
                    <FormTitle text='Entre com seu email para resetar a senha' />
                    <FormInput type='text' placeholder='Email' />
                    <FormButton text='Resetar Senha' type='submit' handleOnChange={() => setPage('confirm')}/>
                    <Link text="Cancelar" handleOnChange={() => setPage('login')}/>
                </form>
            </div>
        )
    }
    else if (page == 'confirm') {
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
    else if (page == 'terms') {
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
    else if (page == 'confirmEmail') {
        return (
            <div className='m-4 px-4 flex justify-center items-center pt-20'>
                <div className='container lg:mx-auto max-w-sm border-black border-2 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4'>
                    <FormTitle text='Entre no seu email para validar sua conta' />
                    <FormButton text='Reenviar link' type='submit' handleOnChange={() => setPage('confirmEmail')}/>
                    <Link text="Cancelar" handleOnChange={() => setPage('login')}/>
                </div>
            </div>
        )
    }
}


export default withPublic(login)