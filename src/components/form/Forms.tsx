import { ErrorMessage } from '@hookform/error-message';
import { cpf } from 'cpf-cnpj-validator';
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import isEmail from 'validator/lib/isEmail';
import { IPostClient, IPostProvider, IPostRegisterSell } from '../../types';
import PhoneInput from 'react-phone-number-input'
import DatePicker from "react-datepicker";
import router, { useRouter } from 'next/router';
import isStrongPassword from 'validator/lib/isStrongPassword'
import { differenceInDays, differenceInYears} from 'date-fns';

import { Client } from '../../service/Client';
import "react-datepicker/dist/react-datepicker.css";
import 'react-phone-number-input/style.css'
import { sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase'
import { ServiceProvider } from '../../service/ServiceProvider'
import { sellConfirm } from '../../service/Sell';
import { InputClientEmail, InputDate, InputDescription, InputDisplayName, InputPassword, InputPhoneNumber, InputPrice, InputSchedulerDate, InputEmail, InputSession, InputStudio, InputBirthDay } from './Input';

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
        signInWithEmailAndPassword(auth, submit.email, submit.password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user.emailVerified) {
                router.push("/home")
            }
            else {
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
        const JSONdata = JSON.stringify(data)
     
        const endpoint = 'http://0.0.0.0:8080/provider/create'
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
                        router.push("/home")
                    }
                    else {
                        sendEmailVerification(auth.currentUser)
                    }
                })
            }
        } catch (err) {
            console.log(err)
        }
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
        setPage("confirm")
        sendPasswordResetEmail(auth, submit.email)
        .then(() => {
            console.log('confirm')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
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

export function FormProvider({children}) {

    const router = useRouter();
    const { control, register, handleSubmit, formState: { errors } } = useForm<IPostProvider>();
    const [passwordHidden, setPasswordHidden] = useState(true)
    const [loading, setLoading] = useState(false)

    const myOnSubmit: any = async (submit: IPostProvider) => {
        setLoading(true)
        try {
            if (await ServiceProvider.createWithEmailAndPassword(submit)) {
                router.replace('/serviceprovider/')
            }
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }


    return (

        <div className='m-4 px-4 flex justify-center items-center pt-20'>
            <form className='bg-white container lg:mx-auto max-w-sm border-black border-2 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(myOnSubmit)}>
                <div className='mb-4 flex'>
                    <h1 className='text-2xl font-bold dark:text-black'>Tatuador</h1>
                </div>
                <div className="relative mb-6">
                    <label>E-mail</label>
                    <input {...register("email",
                        {
                            required: "Campo Obrigatório",
                            minLength: {
                                value: 10,
                                message: "Campo Obrigatório"
                            },
                            validate: (value) => {
                                if (!isEmail(value)) return "Email inválido"
                            }
                        })} className='bg-white border-2 border-black border-b-4 text-black-900 text-sm rounded-lg block w-full p-2.5' type="text" placeholder='Email' />
                    <ErrorMessage errors={errors} name="email" />
                </div>
                <div className="relative mb-6">
                    <label>Nome</label>
                    <input {...register("display_name", {
                        required: "Campo Obrigatório",
                        minLength: {
                            value: 10,
                            message: "Nome muito curto"
                        },
                        maxLength: {
                            value: 36,
                            message: "Nome muito longo"
                        }
                    })} className='bg-white border-2 border-black border-b-4 text-black-900 text-sm rounded-lg block w-full p-2.5' type="text" />
                    <ErrorMessage errors={errors} name="display_name" />
                </div>
                <div className="relative mb-6">
                    <label>CPF</label>
                    <input id='cpf' {...register("cpf",
                        {
                            required: "Campo Obrigatório",
                            minLength: {
                                value: 11,
                                message: "nao"
                            },
                            maxLength: 11,
                            validate: (value) => {
                                if (!cpf.isValid(value)) return "Informe um CPF valido"
                            }
                        })} pattern="\d*+" className='bg-white border-2 border-black border-b-4 text-black-900 text-sm rounded-lg block w-full p-2.5' type="number" />
                    <ErrorMessage errors={errors} name="cpf" />
                </div>
                <div className="relative mb-6">
                    <label>Celular</label>
                    {
                        <Controller
                            control={control}
                            name="phone_number"
                            rules={{ required: "Campo Obrigatório", minLength: 10 }}
                            render={({ field }) => (
                                <PhoneInput
                                    className='bg-white border-2 border-black border-b-4 text-black-900 text-sm rounded-lg focus:ring-black focus:border-white focus:border-2 block w-full p-2.5'
                                    name="phone_number"
                                    rules={{ required: true }}
                                    onChange={(phone) => field.onChange(phone)}
                                    defaultCountry="BR"
                                />
                            )}
                        />

                    }
                    <ErrorMessage errors={errors} name="phone_number" />
                </div>
                <div className="relative mb-6">
                    <label>Data de Nascimento</label>
                    {
                        <Controller
                            control={control}
                            name="birth_date"
                            rules={{
                                required: "Campo Obrigatório",
                                validate: (value) => {
                                    if (differenceInYears(new Date(), new Date(value)) < 18) return "É preciso ser maior de 18 anos"
                                }
                            }}
                            render={({ field }) => (
                                <DatePicker
                                    className='bg-white border-2 border-black border-b-4 text-black-900 text-sm rounded-lg block w-full p-2.5'
                                    placeholderText="Select date"
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    dateFormat="dd/MM/yyyy" />
                            )} />
                    }
                    <ErrorMessage errors={errors} name="birth_date" />
                </div>
                <div className="relative mb-6">
                    <label>Senha</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 right-0 flex items-center px-2">
                            <input onClick={() => setPasswordHidden(!passwordHidden)} className="hidden js-password-toggle" id="toggle" type="checkbox" />
                            <label className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label" htmlFor="toggle">{passwordHidden ? 'show' : 'hidden'}</label>
                        </div>
                        <input {...register("password",
                            {
                                required: true,
                                minLength: {
                                    value: 8,
                                    message: "Senha curta"
                                },
                                maxLength: {
                                    value: 16,
                                    message: "Senha longa"
                                },
                                validate: (value) => {
                                    if (!isStrongPassword(value)) return "Senha fraca"
                                }
                            })} className='bg-white border-2 border-black border-b-4 text-black-900 text-sm rounded-lg block w-full p-2.5' id="password" type={passwordHidden ? "password" : "text"} />
                    </div>
                    <ErrorMessage errors={errors} name="password" />
                </div>
                <div className='relative mb-6'>
                    {
                        !loading ? (
                            <button type="submit" className='bg-black text-white text-sm rounded-lg focus:ring-black block w-full p-2.5'>
                                CADASTRAR
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
                {children}
            </form>
        </div>

    )
}

export function FormClient() {

    const myOnSubmit: any = async (submit: IPostClient) => {
        try {
            setLoading(true)
            if (await Client.createClient(submit)) {
                router.replace('/register/client')
            }
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    const { handleSubmit, register, control, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false)

    return (
        <div className='m-4 px-4 flex justify-center items-center pt-20'>
            <form className='bg-white container lg:mx-auto max-w-sm border-black border-2 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(myOnSubmit)}>
                <div className='mb-4 flex'>
                    <h1 className='text-2xl font-bold dark:text-black'>Perfil cliente</h1>
                </div>
                <div className="relative mb-6">
                    <label>E-mail</label>
                    <input {...register("email",
                        {
                            required: "Campo Obrigatório",
                            minLength: {
                                value: 10,
                                message: "Campo Obrigatório"
                            },
                            validate: (value) => {
                                if (!isEmail(value)) return "Email inválido"
                            }
                        })} className='border-2 border-black rounded-lg block w-full p-2.5' type="text" placeholder='Email' />
                    <ErrorMessage errors={errors} name="email" />
                </div>
                <div className="relative mb-6">
                    <label>Nome</label>
                    <input {...register("display_name", {
                        required: "Campo Obrigatório",
                        minLength: {
                            value: 10,
                            message: "Nome muito curto"
                        },
                        maxLength: {
                            value: 36,
                            message: "Nome muito longo"
                        }
                    })} className='border-2 border-black rounded-lg block w-full p-2.5' type="text" />
                    <ErrorMessage errors={errors} name="display_name" />
                </div>
                <div className="relative mb-6">
                    <label>CPF</label>
                    <input id='cpf' {...register("cpf",
                        {
                            required: "Campo Obrigatório",
                            minLength: {
                                value: 11,
                                message: "nao"
                            },
                            maxLength: 11,
                            validate: (value) => {
                                if (!cpf.isValid(value)) return "Informe um CPF valido"
                            }
                        })} pattern="\d*+" className='border-2 border-black rounded-lg block w-full p-2.5' type="number" />
                    <ErrorMessage errors={errors} name="cpf" />
                </div>
                <div className="relative mb-6">
                    <label>Celular</label>
                    {
                        <Controller
                            control={control}
                            name="phone_number"
                            rules={{ required: "Campo Obrigatório", minLength: 10 }}
                            render={({ field }) => (
                                <PhoneInput
                                    className='border-2 border-black rounded-lg block w-full p-2.5'
                                    name="phone_number"
                                    rules={{ required: true }}
                                    onChange={(phone) => field.onChange(phone)}
                                    defaultCountry="BR"
                                />
                            )}
                        />

                    }
                    <ErrorMessage errors={errors} name="phone_number" />
                </div>
                <div className="relative mb-6">
                    <label>Data de Nascimento</label>
                    {
                        <Controller
                            control={control}
                            name="birth_date"
                            rules={{
                                required: "Campo Obrigatório",
                                validate: (value) => {
                                    if (differenceInYears(new Date(), new Date(value)) < 18) return "É preciso ser maior de 18 anos"
                                }
                            }}
                            render={({ field }) => (
                                <DatePicker
                                    className="bg-white border-2 border-black border-b-4 text-black-900 text-sm rounded-lg focus:ring-black focus:border-white focus:border-2 block w-full p-2.5"
                                    placeholderText="Select date"
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    dateFormat="dd/MM/yyyy" />
                            )} />
                    }
                    <ErrorMessage errors={errors} name="birth_date" />
                </div>
                <div className='relative mb-6'>
                    {
                        !loading ? (
                            <button type="submit" className='bg-black text-white text-sm rounded-lg focus:ring-black block w-full p-2.5'>
                                CADASTRAR
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
            </form>
        </div>
    )
}

export function FormSell({ children, setPage, setSellData }) {
    const { register, handleSubmit, control, formState: { errors } } = useForm<IPostRegisterSell>();
    const [loading, setLoading] = useState(false)
    const [scheduler, setScheduler] = useState(false)

    const myOnSubmit: any = async (submit) => {
        setLoading(true)
        sellConfirm(submit, setSellData, setPage)
        setLoading(false)
    }

    return (
        <Form onSubmit={handleSubmit(myOnSubmit)}>
            <FormTitle text="Vender"/>
            <InputClientEmail register={register} errors={errors}/>
            <InputPrice register={register} errors={errors}/>
            <InputSession register={register} errors={errors}/>
            {/* <InputStudio register={register} errors={errors}/> */}
            {/* <InputSchedulerDate errors={errors} control={control}/> */}
            <InputDate register={register} errors={errors}/>
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
    const { register, handleSubmit, control, formState: { errors } } = useForm<IPostClient>();
    const [loading, setLoading] = useState(false)

    const myOnSubmit: any = async (submit: IPostClient) => {
        try {
            setLoading(true)
            console.log(submit)
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
            <InputBirthDay control={control} errors={errors} />
            <FormButton loading={loading} text='Cadastrar'/>
            {children}
        </Form>
    )
}

