import React, { useState } from 'react'
import { withPublic } from '../../hook/route'

const clientRegister = () => {
    const [page, setPage] = useState("register");

    if (page == "register") {
        return (
            <div className='m-4 px-4 flex justify-center items-center pt-20'>
                <form className='container lg:mx-auto max-w-md border-black border-2 rounded-lg shadow-md px-8 pt-6 pb-8 mb-4'>
                    <div className='mb-4 flex'>
                        <h1 className='text-center text-4xl font-bold pb-6'>Cliente</h1>
                    </div>
                    <div className="relative mb-6">
                        <label>Email</label>
                        <input className='border-2 border-black  rounded-lg block w-full p-2.5' type="text"/>
                    </div>
                    <div className="relative mb-6">
                        <label>Nome</label>
                        <input className='border-2 border-black  rounded-lg block w-full p-2.5' type="text"/>
                    </div>
                    <div className="relative mb-6">
                        <label>Celular (Opcional)</label>
                        <input className='border-2 border-black  rounded-lg block w-full p-2.5' type="text"/>
                    </div>
                    <div className="relative mb-6">
                        <label>Data de nascimento</label>
                        <input className='border-2 border-black  rounded-lg block w-full p-2.5' type="text"/>
                    </div>
                    <button type="submit" className='bg-black text-white rounded-lg focus:ring-black block w-full p-2.5'>
                        Cadastrar
                    </button>
                    <button onClick={() => setPage("terms")} className='text-center text-sky-500 w-full pt-6'>
                        Clicando em "Criar conta" você está de acordo com os Termos de Serviço 
                    </button>
                </form>
            </div>
        )
    }
    else if (page == "terms") {
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
                    <button onClick={() => setPage("register")} className='font-bold text-sky-500 w-full p-2.5'>
                        Criar
                    </button>
                </div>
            </div>
        )
    }
}


export default withPublic(clientRegister)