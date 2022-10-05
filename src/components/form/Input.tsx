import { ErrorMessage } from '@hookform/error-message';
import { useState } from 'react';
import { Controller } from "react-hook-form";
import isEmail from 'validator/lib/isEmail';
import DatePicker from "react-datepicker";
import isStrongPassword from 'validator/lib/isStrongPassword'
import { differenceInDays, differenceInHours, differenceInYears } from 'date-fns';
import PhoneInput from 'react-phone-number-input'

export function InputStudio({ register, errors }) {
    return (
        <div className="relative mb-6">
            <label>Estudio (Opcional)</label>
            <input {...register("studio_name",
                {
                    required: false,
                    validate: (value) => {
                        if (value.length > 36 || value.length < 0) return "Valor inválido"
                    }
                })} className='input' type="text" />
            <ErrorMessage errors={errors} name="studio_name" />
        </div>
    )
}

export function InputSession({ register, errors }) {
    return (
        <div className="relative mb-6">
            <label>Sessões</label>
            <input {...register("number_of_sessions",
                {
                    required: true,
                    validate: (value) => {
                        if (value < 0) return "Valor inválido"
                    }
                })} className='input' type="text" />
            <ErrorMessage errors={errors} name="number_of_sessions" />
        </div>
    )
}

export function InputClientEmail({ register, errors }) {
    return (
        <div className="relative mb-6">
            <label>Email do cliente</label>
            <input {...register("client_name",
                {
                    required: true,
                    validate: (value) => {
                        if (!isEmail(value)) return "Email inválido"
                    }
                })} className='input' type="text"/>
            <ErrorMessage errors={errors} name="client_name" />
        </div>
    )
}

export function InputPrice({ register, errors }) {
    return (
        <div className="relative mb-6">
            <label>Preço</label>
            <input {...register("price",
                {
                    required: true,
                    validate: (value) => {
                        if (value < 0) return "Valor inválido"
                    }
                })} className='input' type="currency" />
            <ErrorMessage errors={errors} name="price" />
        </div>
    )
}

export function InputDescription({ register, errors }) {
    return (
        <div className="relative mb-6">
            <label>Descrição (Opcional)</label>
            <textarea {...register("description",
                {
                    required: false,
                    validate: (value) => {
                        if (value.length > 255) return "Descrição muito longa"
                    }
                })} className='input' type="text" />
            <ErrorMessage errors={errors} name="description" />
        </div>
    )
}

export function InputDate({ register, errors }) {
    return (
        <div className="relative mb-6">
            <label>Agendar (Opcional)</label>
            <input {...register("scheduler",
                {
                    required: false,
                    validate: (value) => {
                        if (differenceInHours(new Date(), new Date(value)) > 0) return "Não pode marcar uma data anterior a atual"
                    }
                })} className='input' type="datetime-local" />
            <ErrorMessage errors={errors} name="scheduler" />
        </div>
    )
}

export function InputSchedulerDate({ errors, control }) {
    return (
        <div className="relative mb-6">
            <label>Agendar (Opcional)</label>
            {
                <Controller
                    control={control}
                    name="scheduler"
                    rules={{
                        required: false,
                        validate: (value) => {
                            if (differenceInDays(new Date(), new Date(value)) > 0) return "Não pode marcar uma data anterior a atual"
                        }
                    }}
                    render={({ field }) => (
                        <DatePicker
                            className='input'
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            dateFormat="dd/MM/yyyy" />
                    )} />
            }
            <ErrorMessage errors={errors} name="scheduler" />
        </div>
    )
}

export function InputEmail({ register, errors }) {
    return (
        <div className="relative mb-6">
            <label>Email</label>
            <input {...register("email",
                {
                    required: true,
                    validate: (value) => {
                        if (!isEmail(value)) return "Email inválido"
                    }
                })} className='input' type="text"/>
            <ErrorMessage errors={errors} name="email" />
        </div>
    )
}

export function InputPassword({ register, errors }) {
    const [passwordHidden, setPasswordHidden] = useState(true)

    return (
        <div className="relative mb-6">
            <label>Senha</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 right-0 flex items-center px-2">
                    <input onClick={() => setPasswordHidden(!passwordHidden)} className="hidden js-password-toggle" id="toggle" type="checkbox" />
                    <label className="bg-black rounded px-2 py-1 text-sm text-white cursor-pointer js-password-label" htmlFor="toggle">{passwordHidden ? 'mostrar' : 'esconder'}</label>
                </div>
                <input {...register("password",
                    {
                        required: true,
                        minLength: {
                            value: 8,
                            message: "Senha curta"
                        },
                        validate: (value) => {
                            if (!isStrongPassword(value)) return "Senha fraca"
                        }
                    })} className='input' id="password" type={passwordHidden ? "password" : "text"} />
            </div>
            <ErrorMessage errors={errors} name="password" />
        </div>
    )
}

export function InputDisplayName({ register, errors }) {
    return (
        <div className="relative mb-6">
            <label>Nome</label>
            <input {...register("display_name", {
                required: "Campo Obrigatório",
                maxLength: {
                    value: 36,
                    message: "Nome muito longo"
                }
            })} className='input' type="text" />
            <ErrorMessage errors={errors} name="display_name" />
        </div>
    )
}

export function InputPhoneNumber({ control, errors }) {
    return (
        <div className="relative mb-6">
            <label>Celular (Opcional)</label>
            {
                <Controller
                    control={control}
                    name="phone_number"
                    rules={{ required: "Campo Obrigatório", minLength: 10 }}
                    render={({ field }) => (
                        <PhoneInput
                            className='input'
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
    )
}

export function InputBirthDay({ control, errors}) {
    return (
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
                            className='input'
                            placeholderText="Select date"
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            dateFormat="dd/MM/yyyy" />
                    )} />
            }
            <ErrorMessage errors={errors} name="birth_date" />
        </div>
    )
}