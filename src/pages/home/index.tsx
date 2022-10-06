import { withProtected } from "../../hook/route"
import { CardBase, CardBaseSmall, CardClient, CardCreateClient, CardHistory, CardSell, CardTitle } from "../../components/card/CardBase"
import { useState } from "react";
import { FormSell } from "../../components/form/Forms";
import { Button } from "../../components/button/Button";
import { LinkText } from "../../components/LinkText";
import { createSellDb } from "../../service/Sell";

function home() {

    const [page, setPage] = useState('home');
    const [sellData, setSellData] = useState({
        client_email: "",
        service_provider_name: "",
        client_display_name: "",
        price: "",
        number_of_sessions: "",
        studio_name: "",
        description: "",
        start_time: "",
        last_update: ""
    })

    function showHome() {
        return (
            <>
                <CardBase>
                    <CardTitle text="Meu Trabalho"/>
                    <CardCreateClient />
                    <CardSell setPage={() => setPage('createSell')}/>
                    <CardHistory />
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

    function createSell() {
        return (
            <FormSell setPage={setPage} setSellData={setSellData}>
                <LinkText text='cancelar' handleOnChange={() => setPage('home')}></LinkText>
            </FormSell>
        )
    }

    function confirmSell() {
        function submitSell() {
            if (createSellDb(sellData)) {
                console.log("sucess")
                setPage('sucess')
            }
        }

        return (
            <CardBaseSmall>
                <CardTitle text={"informações da venda"}/>
                <div className="border-black border-2 rounded-lg px-4 py-2 px-4 my-4">
                    <p>Data: {sellData.last_update}</p>
                    <p>Valor: R$ {sellData.price}</p>
                    <p>Sessões: 1 de {sellData.number_of_sessions}</p>
                </div>

                <div className="border-black border-2 rounded-lg px-4 py-2 my-4">
                    <p className="text-xl font-semibold">Cliente</p>
                    <p>Nome: {sellData.client_display_name}</p>
                    <p>email: {sellData.client_email}</p>
                    <p>+18</p>
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
                    <p>{sellData.description}</p>
                </div>

                <div className="border-black border-2 rounded-lg px-4 py-2 my-4">
                    <p className="text-xl font-semibold">Resumo</p>
                    <p>Valor: R$ {sellData.price}</p>
                    <p>Taxa: R$ 0,00</p>
                    <p>Total: R$ {sellData.price} </p>
                </div>
                <Button text="Concluir venda" type="text" handleOnChange={submitSell} />
                <LinkText text='voltar' handleOnChange={() => setPage('createSell')} />
            </CardBaseSmall>
        )
    }

    function sucess() {
        return (
            <CardBaseSmall>
                <CardTitle text={"Venda concluída"}/>
                <Button text="Home" type="text" handleOnChange={() => setPage('home')} />
            </CardBaseSmall>
        )
    }

    switch(page) {
        case 'home':
            return showHome()
        case 'createSell':
            return createSell()
        case 'confirmSell':
            return confirmSell()
        case 'sucess':
            return sucess()
    }
}

export default withProtected(home)