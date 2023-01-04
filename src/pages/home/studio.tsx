import { useRouter } from "next/router"
import { FormConnectStudio } from "../../components/form/Forms"
import { TableStudio } from "../../components/table/Table"
import { withProtected } from "../../hook/route"

// export async function getServerSideProps(context) {
    // const token = nookies.get(context, "__session")
    // const response = await getAllClientsData(`Bearer ${token["__session"]}`)
    // const clients = await response.json()
  
    // return {
    //   props: { clients }
    // }
// }
  
function Studio(props) {

const router = useRouter()

return (
    <>
        <FormConnectStudio>
        </FormConnectStudio>
        <TableStudio props="">
        </TableStudio>
    </>
    // <TableClients props={props}>
    // <LinkText text='voltar' handleOnChange={() => {router.push('/home')}}></LinkText>
    // </TableClients>
)
}

export default withProtected(Studio)