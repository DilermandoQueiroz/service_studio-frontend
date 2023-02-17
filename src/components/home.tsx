import Link from "next/link";

export function Home() {
    return (
        <main id="skip">
            <section className="">
                <div className="max-w-6xl mx-auto py-12 sm:py-24 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col align-center">
                        <h1 className="bg-clip-text to-violet-500 text-4xl font-extrabold text-center sm:text-6xl max-w-2xl m-auto">
                        Tattoo Community Drawing Connections
                        </h1>
                        {/* <p className="mt-10 sm:mt-20 text-xl text-center sm:text-2xl max-w-xl m-auto">
                        Você pode melhorar a organização do seu trabalho de uma maneira simples e fácil,
                        agendando sessões com seus clientes e estúdios.
                        </p> */}
                        <Link href='/signup'>
                            <button type="submit" className='mt-10 max-w-xs m-auto bg-black text-white text-xl font-semibold rounded-lg focus:ring-black block w-full p-2.5 button-movement'>
                            Participar
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
            
            {/* <section className="bg-black pb-8 px-4 py-8">
                <div className='bg-black border-white border-2 rounded-lg px-4 pt-6 pb-8 mb-4'>
                    <p className="text-center text-white">
                    Junte-se a outros estudios e tatuadores participando do desenvolvemento de uma solução para o mercado.
                    </p>
                </div> 
            </section> */}
        </main>
    )
}