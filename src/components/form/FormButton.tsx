export interface FormInput {
    type: any,
    text: any,
    placeholder?: any,
    handleOnChange?: any,
    value?: any
}

export function FormButton({ type, text, placeholder, handleOnChange, value }: FormInput) {
    return (
            <button 
                className='bg-black text-white rounded-lg focus:ring-black block w-full p-2.5'
                type={type}
                onClick={handleOnChange}
            >
            {text}
            </button>
    )
}
