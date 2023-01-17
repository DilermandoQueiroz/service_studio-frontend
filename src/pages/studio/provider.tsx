import { useRouter } from "next/router"
import { FormConnectServiceProvider, FormConnectStudio } from "../../components/form/Forms"
import { TableServiceProvider, TableStudio } from "../../components/table/Table"
import { withProtected } from "../../hook/route"
import nookies from 'nookies'
import { LinkText } from "../../components/LinkText"
import getServiceProvider from "../api/connect/studio"
import { CardBase, CardTitle } from "../../components/card/CardBase"

export async function getServerSideProps(context) {
    const token = nookies.get(context, "__session")
    const response = await getServiceProvider(`Bearer ${token["__session"]}`)
    const serviceProvider = await response.json()

    return {
      props: { serviceProvider }
    }
}
  
function Studio(props) {
    
    const router = useRouter()

    return (
        <>
            {/* <FormConnectServiceProvider>
            </FormConnectServiceProvider> */}
            <CardBase>
                <CardTitle text="Conectar Tatuador"/>
                Ainda estamos implementando essa funcionalidade!
                Você poderá chamar tatuadores para participar do seu estúdio em breve!
            </CardBase>
            <TableServiceProvider props={props}>
            </TableServiceProvider>
            <LinkText text='voltar' handleOnChange={() => {router.push('/studio')}}></LinkText>
        </>
    )
}

export default withProtected(Studio)