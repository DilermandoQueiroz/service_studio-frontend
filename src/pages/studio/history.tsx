import { useRouter } from 'next/router'
import nookies from 'nookies'
import { LinkText } from '../../components/LinkText'
import { TableSells } from '../../components/table/Table'

import { withProtected } from "../../hook/route"
import getAllStudioSellsData from '../api/studio/sells'

export async function getServerSideProps(context) {
    const token = nookies.get(context, "__session")
    const response = await getAllStudioSellsData(`Bearer ${token["__session"]}`)
    const sells = await response.json()

    return {
      props: { sells }
    }
}

function SalesHistory(props) {
    const router = useRouter()
    return (
        <TableSells props={props}>
            <LinkText text='voltar' handleOnChange={() => {router.push('/studio')}}></LinkText>
        </TableSells>
    )
}

export default withProtected(SalesHistory)