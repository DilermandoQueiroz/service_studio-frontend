import { withProtected } from "../../hook/route"
import { CardBase, CardClient, CardHistory, CardServiceProvider, CardTitle } from "../../components/card/CardBase"
import { FormCreateStudio } from "../../components/form/Forms"

function home() {
    return (
        <div>
            <CardBase>
                <CardTitle text="Meu Estúdio"/>
                <CardServiceProvider />
                <CardHistory/>
                <CardClient />
            </CardBase>
        </div>
    )
}

export default withProtected(home)