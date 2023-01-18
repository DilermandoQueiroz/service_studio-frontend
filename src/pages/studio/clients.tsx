import { useRouter } from 'next/router'
import nookies from 'nookies'
import { LinkText } from '../../components/LinkText'
import { TableClients } from '../../components/table/Table'

import { withProtected } from "../../hook/route"
import getAllStudioClientsData from '../api/studio/clients'

export async function getServerSideProps(context) {
    const token = nookies.get(context, "__session")
    const response = await getAllStudioClientsData(`Bearer ${token["__session"]}`)
    const clients = await response.json()
  
    return {
      props: { clients }
    }
  }
  
  function ClientsProvider(props) {
    
    const router = useRouter()
  
    return (
      <TableClients props={props}>
        <LinkText text='voltar' handleOnChange={() => {router.push('/home')}}></LinkText>
      </TableClients>
    )
  }
  
  export default withProtected(ClientsProvider)