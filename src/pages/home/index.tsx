import { withProtected } from "../../hook/route"
import { CardBase, CardClient, CardCreateClient, CardHistory, CardNextSell, CardSell, CardStudio, CardTitle } from "../../components/card/CardBase"
import { useState } from "react";
import { useRouter } from "next/router";
import nookies from 'nookies'
import { getNextSells } from "../api/provider/nextsells";


export async function getServerSideProps(context) {
    const token = nookies.get(context, "__session")
    const response = await getNextSells(`Bearer ${token["__session"]}`)
    const sells = await response.json()

    return {
      props: { sells }
    }
}

function home(props) {

    const router = useRouter()
    const [page, setPage] = useState('home');

    return (
        <div>
            <CardBase>
                <CardTitle text="Meu Trabalho"/>
                <CardCreateClient />
                <CardSell/>
                <CardHistory link={"/home/history"}/>
                <CardClient link={"/home/clients"}/>
                <CardStudio />
            </CardBase>
            <CardBase>
                <CardTitle text="Próxima tatuagem"/>
                <CardNextSell props={props}/>
            </CardBase>
        </div>
    ) 
}

export default withProtected(home)