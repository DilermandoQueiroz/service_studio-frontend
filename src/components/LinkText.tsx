export function LinkText({ text, handleOnChange }) {
    return (
        <button
            className='link'
            onClick={handleOnChange}
        >
            {text}
        </button>
    )
}