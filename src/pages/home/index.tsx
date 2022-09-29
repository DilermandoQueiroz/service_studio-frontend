import { withProtected } from "../../hook/route"
import { CardBase, CardBaseSmall, CardClient, CardCreateClient, CardHistory, CardSell, CardTitle } from "../../components/card/CardBase"
import { useState } from "react";
import { FormSell } from "../../components/form/Forms";
import { FormButton } from "../../components/form/FormButton";
import { Link } from "../../components/Link";

function home() {

    const [page, setPage] = useState('confirmSell');

    function showHome() {
        return (
            <>
                <CardBase>
                    <CardTitle text="Meu Trabalho"/>
                    <CardCreateClient />
                    <CardSell />
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
            <FormSell setPage={setPage}>

            </FormSell>
        )
    }

    function confirmSell() {
        return (
            <CardBaseSmall>
                <CardTitle text={"informações da venda"}/>
                <div className="border-black border-2 rounded-lg px-4 py-2 px-4 my-4">
                    <p>Data: 03/08/2022</p>
                    <p>Numero da venda: 1231923819238</p>
                    <p>Valor: R$ 420,00</p>
                    <p>Sessões: 1 de 3</p>
                </div>

                <div className="border-black border-2 rounded-lg px-4 py-2 my-4">
                    <p className="text-xl font-semibold">Cliente</p>
                    <p>Nome: Claudinho buchecha</p>
                    <p>email: claudinho_pagode@email.com.br</p>
                    <p>+18</p>
                </div>

                <div className="border-black border-2 rounded-lg px-4 py-2 my-4">
                    <p className="text-xl font-semibold">Estudio</p>
                    <p>Nome: Tatuagens legais</p>
                    <p>CNPJ: 123918230978932</p>
                    <p>taxa: 30%</p>
                    <div>contato: tatuagens_legais@estudio.com</div>
                </div>

                <div className="border-black border-2 rounded-lg px-4 py-2 my-4">
                    <p className="text-xl font-semibold">Descrição</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type
                        specimen book.</p>
                </div>

                <div className="border-black border-2 rounded-lg px-4 py-2 my-4">
                    <p className="text-xl font-semibold">Resumo</p>
                    <p>Valor: R$ 294,00</p>
                    <p>Taxa: R$ 126,00</p>
                    <p>Total: R$ 420,00 </p>
                </div>
                <FormButton text="Concluir venda" type="text"></FormButton>
                <Link text='voltar' handleOnChange={() => setPage('createSell')}></Link>
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
    }
}

export default withProtected(home)