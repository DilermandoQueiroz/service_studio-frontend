import { useRouter } from "next/router"
import { FormConnectStudio } from "../../components/form/Forms"
import { TableStudio } from "../../components/table/Table"
import { withProtected } from "../../hook/route"
import nookies from 'nookies'
import getStudios from "../api/connect/provider"
import { LinkText } from "../../components/LinkText"

export async function getServerSideProps(context) {
    const token = nookies.get(context, "__session")
    const response = await getStudios(`Bearer ${token["__session"]}`)
    const studios = await response.json()

    return {
      props: { studios }
    }
}
  
function Studio(props) {

    const router = useRouter()

    return (
        <>
            <FormConnectStudio>
            </FormConnectStudio>
            <TableStudio props={props}>
            </TableStudio>
            <LinkText text='voltar' handleOnChange={() => {router.push('/home')}}></LinkText>
        </>
    )
}

export default withProtected(Studio)