export interface FormInput {
    type: any,
    id?: any,
    text?: any,
    placeholder?: any,
    handleOnChange?: any,
    value?: any
}

export function FormInput({ type, id, text, placeholder, handleOnChange, value }: FormInput) {
    return (
        <div className="relative mb-6">
            <label>{text}</label>
            <input 
                className='border-2 border-black rounded-lg block w-full p-2.5'
                type={type}
                id={id}
                onChange={handleOnChange}
                value={value}
                placeholder={placeholder}
            />
        </div>
    )
}
