import { useState } from 'react';
import { IPostClient, IPostRegisterSell } from '../../types';

import { Client } from '../../service/Client';
import "react-datepicker/dist/react-datepicker.css";
import 'react-phone-number-input/style.css'
import { ServiceProvider } from '../../service/ServiceProvider'
import { sellConfirm } from '../../service/Sell';
import { InputClientEmail, InputDate, InputDescription, InputDisplayName, InputPassword, InputPhoneNumber, InputPrice, InputSchedulerDate, InputEmail, InputSession, InputStudio, InputBirthDay } from './Input';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ClientCreate } from '../../types/Client';
import { SellCreate } from '../../types/Sell';

export function FormTitle({ text }) {
    return (
        <div className='mb-4 flex'>
            <h1 className='text-left text-4xl font-bold pb-6'>
                {text}
            </h1>
        </div>
    )
}

export function Form({ onSubmit, children }) {
    return (
        <div className='m-4 flex justify-center items-center'>
            <form className='bg-white container lg:mx-auto max-w-sm border-black border-2 rounded-lg shadow-md px-4 pt-6 pb-8 mb-4' onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    )
}

export function FormButton({ loading, text }) {
    return (
        <div className='relative mb-6'>
            {
                !loading ? (
                    <button type="submit" className='formbutton'>
                        {text}
                    </button>
                ) : (
                    <button disabled type="button" className="place-content-center bg-black text-white text-sm rounded-lg focus:ring-black block w-full p-2.5 py-2.5 px-5 mr-2 text-sm font-medium text-white bg-white rounded-lg border border-gray-200 inline-flex items-center">
                        <svg className="inline mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </button>
                )
            }
        </div>
    )
}

export function FormLogin({ children }) {
    const router = useRouter()
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false)

    const myOnSubmit: any = async (submit) => {
        setLoading(true)
        const success = await ServiceProvider.loginWithEmailAndPassword(submit.email, submit.password)
        if (success) {
            router.push('/home')
        }
        setLoading(false)
    }

    return (
        <Form onSubmit={handleSubmit(myOnSubmit)}>
            <FormTitle text='Logar'/>
            <InputEmail register={register} errors={errors}/>
            <InputPassword register={register} errors={errors}/>
            <FormButton text='Entrar' loading={loading}/>
            {children}
        </Form>
    )
}

export function FormCreateServiceProvider({ children }) {
    const router = useRouter()
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false)

    const myOnSubmit: any = async (submit) => {
        setLoading(true)
        const data = {
            email: submit.email,
            password: submit.password,
            display_name: submit.display_name
        }

        ServiceProvider.createWithEmailAndPassword(data)

        setLoading(false)
    }

    return (
        <Form onSubmit={handleSubmit(myOnSubmit)}>
            <FormTitle text='Tatuador'/>
            <InputEmail register={register} errors={errors}/>
            <InputPassword register={register} errors={errors}/>
            <InputDisplayName register={register} errors={errors}/>
            <FormButton text='Criar conta' loading={loading}/>
            {children}
        </Form>
    )
}

export function FormResetPassword({ children, setPage }) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false)

    const myOnSubmit: any = async (submit) => {
        setLoading(true)
        ServiceProvider.resetPasswordWithEmail(submit.email)
        setPage("confirm")
        setLoading(false)
        
    }

    return (
        <Form onSubmit={handleSubmit(myOnSubmit)}>
            <FormTitle text='Entre com seu email para resetar a senha'/>
            <InputEmail register={register} errors={errors}/>
            <FormButton text='Resetar senha' loading={loading}/>
            {children}
        </Form>
    )
}

export function FormSell({ children, setPage, setSellData }) {
    const { register, handleSubmit, control, formState: { errors } } = useForm<SellCreate>();
    const [loading, setLoading] = useState(false)
    const [scheduler, setScheduler] = useState(false)

    const myOnSubmit: any = async (submit) => {
        setLoading(true)
        const response = await sellConfirm(submit, setSellData)
        if (response) {
            setPage("confirmSell")
        }
        setLoading(false)
    }

    return (
        <Form onSubmit={handleSubmit(myOnSubmit)}>
            <FormTitle text="Vender"/>
            <InputClientEmail register={register} errors={errors}/>
            <InputPrice register={register} errors={errors}/>
            {/* <InputSession register={register} errors={errors}/> */}
            {/* <InputStudio register={register} errors={errors}/> */}
            <InputSchedulerDate errors={errors} control={control}/>
            {/* <InputDate register={register} errors={errors}/> */}
            <InputDescription register={register} errors={errors}/>
            
            {/* <div className="relative mb-6">
                <input type='checkbox' onClick={() => {setScheduler(!scheduler)}}></input>
                <label className='ml-2'>Agendar sessão</label>
            </div> */}
            
            {/* {scheduler ? <InputSchedulerDate errors={errors} control={control}/> : null} */}
            <FormButton loading={loading} text='Próximo'/>
            {children}
        </Form>
    )
}

export function FormCreateClient({ children, setPage }) {
    const { register, handleSubmit, control, formState: { errors } } = useForm<ClientCreate>();
    const [loading, setLoading] = useState(false)

    const myOnSubmit: any = async (submit: ClientCreate) => {
        console.log(submit)
        try {
            setLoading(true)
            if (await Client.createClient(submit)) {
                setPage('confirmed')
            }
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    return (
        <Form onSubmit={handleSubmit(myOnSubmit)}>
            <FormTitle text="Cliente"/>
            <InputEmail register={register} errors={errors} />
            <InputDisplayName register={register} errors={errors} />
            <InputPhoneNumber control={control} errors={errors} />
            <FormButton loading={loading} text='Cadastrar'/>
            {children}
        </Form>
    )
}

