import { withProtected } from "../../hook/route"
import { CardBase, CardBaseSmall, CardClient, CardCreateClient, CardHistory, CardSell, CardTitle } from "../../components/card/CardBase"
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function home() {

    const router = useRouter()
    const [page, setPage] = useState('home');

    return (
        <>
            <CardBase>
                <CardTitle text="Meu Trabalho"/>
                <CardCreateClient />
                <CardSell/>
                <CardHistory/>
                <CardClient />
            </CardBase>
            <CardBase>
                <CardTitle text="Próximas tatuagens"/>
                <div>
                    Você verá em breve suas proximas tatuagens aqui, por enquanto você pode ver no historico
                </div>
            </CardBase>
        </>
    ) 
}

export default withProtected(home)