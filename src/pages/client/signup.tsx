import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { Button } from '../../components/button/Button';
import { CardBaseSmall, CardTitle } from '../../components/card/CardBase';
import { FormCreateClient } from '../../components/form/Forms';
import { LinkText } from '../../components/LinkText';
import { TermsService } from '../../components/TermsService';
import { withPublic } from '../../hook/route'

const clientRegister = () => {
    const router = useRouter()
    const [page, setPage] = useState("register");

    function register() {
        return (
            <FormCreateClient setPage={setPage}>
                <LinkText handleOnChange={() => setPage('terms')} text='Clicando em “Cadastrar”, você está de acordo com os Termos de Serviço'></LinkText>
                <LinkText handleOnChange={() => {router.push('/home')}} text="Voltar"/>
            </FormCreateClient>
        )
    }

    function confirmed() {
        return (
            <CardBaseSmall>
                <CardTitle text={"Cadastro concluído"}/>
                <Button text="Home" type="text" handleOnChange={() => {router.push('/home')}} />
            </CardBaseSmall>
        )
    }

    function terms() {
        return (
            <TermsService setPage={() => setPage("register")} />
        )
    }

    switch (page) {
        case 'register':
            return register()
        case 'terms':
            return terms()
        case 'confirmed':
            return confirmed()
    }
}


export default withPublic(clientRegister)