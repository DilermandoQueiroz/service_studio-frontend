import { withProtected } from "../../hook/route"
import { CardBase, CardBaseSmall, CardClient, CardCreateClient, CardHistory, CardSell, CardTitle } from "../../components/card/CardBase"
import { useState } from "react";
import { FormSell } from "../../components/form/Forms";
import { Button } from "../../components/button/Button";
import { LinkText } from "../../components/LinkText";
import { createSellDb } from "../../service/Sell";
import { useRouter } from "next/router";

function createSell() {

    const router = useRouter()
    const [page, setPage] = useState('createSell');
    const [sellData, setSellData] = useState({
        client_display_name: "",
        client_email: "",
        studio_id: "",
        price: 0,
        start_time: "",
        actual_session: 0,
        scheduled_time: "",
        description: "",
        finished: false
    })

    function createSell() {
        return (
            <FormSell setPage={setPage} setSellData={setSellData}>
                <LinkText text='voltar' handleOnChange={() => {router.push('/home')}}></LinkText>
            </FormSell>
        )
    }

    function confirmSell() {
        async function submitSell() {
            const response = await createSellDb(sellData)
            if (response) {
                router.push('/home')
            }
        }

        return (
            <CardBaseSmall>
                <CardTitle text={"informações da venda"}/>
                <div className="border-black border-2 rounded-lg px-4 py-2 px-4 my-4">
                    <p>Data: {new Date(sellData.start_time).toLocaleString()}</p>
                    <p>Agendamento: {sellData.scheduled_time ? new Date(sellData.scheduled_time).toLocaleString() : "sem agendamento"}</p>
                    <p>Valor: R$ {sellData.price}</p>
                </div>

                <div className="border-black border-2 rounded-lg px-4 py-2 my-4">
                    <p className="text-xl font-semibold">Cliente</p>
                    <p>Nome: {sellData.client_display_name}</p>
                    <p>email: {sellData.client_email}</p>
                </div>

                {/* <div className="border-black border-2 rounded-lg px-4 py-2 my-4">
                    <p className="text-xl font-semibold">Estudio</p>
                    <p>Nome: {sellData.studio_name}</p>
                    <p>CNPJ: </p>
                    <p>taxa: </p>
                    <div>contato: </div>
                </div> */}

                <div className="border-black border-2 rounded-lg px-4 py-2 my-4">
                    <p className="text-xl font-semibold">Descrição</p>
                    <p>{sellData.description ? sellData.description : "Sem descrição"}</p>
                </div>

                <div className="border-black border-2 rounded-lg px-4 py-2 my-4">
                    <p className="text-xl font-semibold">Resumo</p>
                    <p>Valor: R$ {(sellData.price).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                    <p>Taxa: {(0).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})} </p>
                    <p>Total: R$ {(sellData.price).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})} </p>
                </div>
                <Button text="Concluir venda" type="text" handleOnChange={submitSell} />
                <LinkText text='voltar' handleOnChange={() => setPage('createSell')} />
            </CardBaseSmall>
        )
    }

    switch(page) {
        case 'createSell':
            return createSell()
        case 'confirmSell':
            return confirmSell()
    }
}

export default withProtected(createSell)