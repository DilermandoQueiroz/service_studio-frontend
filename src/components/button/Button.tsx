export interface FormInput {
    type: any,
    text: any,
    handleOnChange?: any,
}

export function Button({ type, text, handleOnChange }: FormInput) {
    return (
            <button 
                className='button'
                type={type}
                onClick={handleOnChange}
            >
            {text}
            </button>
    )
}
