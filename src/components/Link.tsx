export function Link({ text, handleOnChange }) {
    return (
        <button 
            className='text-center text-sky-500 w-full pt-6'
            onClick={handleOnChange}
        >
        {text}
        </button>
    )
}