import React, { useState } from 'react'
import { Button } from '../../components/button/Button';
import { CardBaseSmall, CardTitle } from '../../components/card/CardBase';
import { FormCreateClient } from '../../components/form/Forms';
import { Terms } from '../../components/terms';
import { withPublic } from '../../hook/route'

const clientRegister = () => {
    const [page, setPage] = useState("register");

    function register() {
        return (
            <FormCreateClient setPage={() => (1+1)}>

            </FormCreateClient>
        )
    }

    function confirmed() {
        return (
            <CardBaseSmall>
                <CardTitle text={"Cadastro concluído"}/>
                <Button text="Home" type="text" handleOnChange={() => setPage('register')} />
            </CardBaseSmall>
        )
    }

    function terms() {
        return (
            <Terms setPage={() => setPage("register")} />
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