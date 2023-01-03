import Link from "next/link"

export function CardBase({ children }) {
    return (
        <div className='m-4 flex justify-center items-center'>
            <div className='bg-white container lg:mx-auto max-w-sm border-black border-2 rounded-lg shadow-md px-4 pt-6 pb-8 mb-4'>
                {children}
            </div>             
        </div>
    )
}

export function CardBaseSmall({ children }) {
    return (
        <div className='flex justify-center items-center'>
            <div className='bg-white container lg:mx-auto max-w-sm border-black border-2 rounded-lg shadow-md px-4 pt-6 pb-8 mb-4'>
                {children}
            </div>             
        </div>
    )
}

export function CardTitle({ text }) {
    return (
        <div className='mb-4 flex'>
            <h1 className='text-left text-4xl font-bold pb-6'>
                {text}
            </h1>
        </div>
    )
}

function CardLinkBase({ children }) {
    return (
        <div className="relative w-full mb-4 divide">
            {children}
        </div>
    )
}

function CardLinkName({ text }) {
    return (
        <button className="absolute text-xl inset-y-0 left-10 flex items-center px-2">
            {text}
        </button>
    )
}

export function CardCreateClient() {
    return (
        <Link href="client/signup">
            <div>
                <CardLinkBase>
                    <div className="bg-red-500 rounded-lg block p-1 w-10">
                        <svg className="h-8 w-8 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="7" r="4" />  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                    </div>
                    <CardLinkName text="Cadastrar cliente "/>
                </CardLinkBase>
            </div>
        </Link>
    )
}

export function CardSell() {
    return (
        <Link href="home/sell">
            <div>
                <CardLinkBase>
                    <div className="bg-violet-500 rounded-lg block p-1 w-10">
                        <svg className="h-8 w-8 text-white"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                    </div>
                    <CardLinkName text="Cadastrar venda"/>
                </CardLinkBase>
            </div>
        </Link>
        
    )
}

export function CardHistory() {
    return (
        <Link href="/home/history">
            <div>
                <CardLinkBase>
                    <div className="bg-pink-500 rounded-lg block p-1 w-10">
                        <svg className="h-8 w-8 text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="3" y1="21" x2="21" y2="21" />  <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />  <path d="M5 21v-10.15" />  <path d="M19 21v-10.15" />  <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" /></svg>
                    </div>
                    <CardLinkName text="Histórico"/>
                </CardLinkBase>
            </div>
        </Link>
    )
}

export function CardClient() {
    return (
        <Link href="/home/clients">
            <div>
                <CardLinkBase>
                    <div className="bg-green-500 rounded-lg block p-1 w-10">
                        <svg className="h-8 w-8 text-white"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                    </div>
                    <CardLinkName text="Clientes"/>
                </CardLinkBase>
            </div>
        </Link>
    )
}

export function CardNextSell({props}) {
    if (props.sells) {
        return (
            <div>
                <CardBaseSmall>
                    <div>
                        Data: {props.sells.Sell.scheduled_time}
                    </div>
                    <div>
                        Sessão: {props.sells.Sell.actual_session}
                    </div>
                    <div>
                        Valor: R$ {props.sells.Sell.price}
                    </div>
                    <div>
                        Estudio: sem estudio
                    </div>
                    <div>
                        Cliente: {props.sells.display_name}
                    </div>
                </CardBaseSmall>
                <CardBaseSmall>
                    <div>
                    {props.sells.Sell.description}
                    </div>
                </CardBaseSmall>
            </div>
        )
    }
    else {
        return (
            <>Você não tem próxima tatuagem!</>
        )
    }
}