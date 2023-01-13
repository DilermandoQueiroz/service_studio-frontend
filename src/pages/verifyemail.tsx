import { CardBase, CardTitle } from '../components/card/CardBase'
import { verifyemail, withProtected } from '../hook/route'

const serviceProviders = () => {

  return (
    <div>
      <CardBase>
	  	<CardTitle text="Verificar email"/>
			Entre no link enviado para verificar seu email! Caso não esteja verifique o spam!

	  </CardBase>
    </div>
  )
}


export default withProtected(serviceProviders)
