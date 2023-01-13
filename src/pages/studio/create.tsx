import { withProtected } from "../../hook/route"
import { FormCreateStudio } from "../../components/form/Forms"

function home() {    

    return (
        <div>
            <FormCreateStudio>

            </FormCreateStudio>
        </div>
    )
}

export default withProtected(home)