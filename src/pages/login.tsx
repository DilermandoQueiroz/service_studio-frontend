import React, { useState } from 'react'
import { withPublic } from '../hook/route'
import { FormCreateServiceProvider, FormLogin, FormResetPassword} from '../components/form/Forms'
import { LinkText } from '../components/LinkText'
import { Terms } from '../components/terms'

const login = () => {
    const [page, setPage] = useState('login');

    const login = () => {
        return (
            <FormLogin>
                <LinkText text='Não possui conta? Crie uma' handleOnChange={() => setPage('create')}/>
                <LinkText text='Esqueceu sua senha?' handleOnChange={() => setPage('reset')}/>
            </FormLogin>
        )
    }

    const create = () => {
        return (
            <FormCreateServiceProvider>
                <LinkText text='Você já possui uma conta? Logar' handleOnChange={() => setPage('login')}/>
                <LinkText text='Clicando em "Criar conta" você está de acordo com os Termos de Serviço' handleOnChange={() => setPage('terms')}/>
            </FormCreateServiceProvider>
        )
    }

    const reset = () => {
        return (
            <FormResetPassword setPage={setPage}>
                <LinkText text="Cancelar" handleOnChange={() => setPage('login')}/>
            </FormResetPassword>
        )
    }

    const confirm = () => {
        return (
            <div className='m-4 flex justify-center items-center'>
                <div className='bg-white container lg:mx-auto max-w-sm border-black border-2 rounded-lg shadow-md px-4 pt-6 pb-8 mb-4'>
                    <div className='mb-4 flex'>
                        <h1 className='text-left text-xl pb-6'>
                            Se uma conta existir com o email informado,
                            você recebera um email com as instruções sobre como resetar sua senha.
                            Se não chegar, verifique sua caixa de spam.
                        </h1>
                    </div>
                    <LinkText text="Volte para logar" handleOnChange={() => setPage('login')}/>
                </div>
            </div>
        )
    }

    const terms = () => {
        return (
            <Terms setPage={() => setPage("create")}/>
        )
    }

    switch(page) {
        case 'login':
            return login()
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