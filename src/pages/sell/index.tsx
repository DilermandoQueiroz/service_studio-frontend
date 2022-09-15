import React, { useState } from 'react'
import { withProtected } from '../../hook/route'
import nookies from 'nookies'
import { SellCard } from '../../components/SellCard'
import MaterialTable, {MTableToolbar} from 'material-table'
import { setTimeout } from 'timers/promises'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';

export async function getServerSideProps(context) {
  try {
    const token = nookies.get(context, "__session")
    
    const response = await fetch('http://192.168.15.12:8000/sell_by_email',
      {
        headers: {
          'Authorization': `Bearer ${token["__session"]}`
        }
      }
    )
    const users = await response.json()

    return {
      props: {
        users
      }, // will be passed to the page component as props
    }
  } catch (error) {
    return {
      props: {

      }
    }
  }

}

const Home = ({ auth, pathname, users }) => {
  const { user } = auth
  const [num, setNum] = useState(0);
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#4caf50',
      },
      secondary: {
        main: '#ff9100',
      },
    },

  });

  return (
    <>
      {/* <div className='mt-10 px-4 flex justify-center items-center'>

        <SellCard users={users} />


      </div> */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <div style={{ maxWidth: '100%' }}>
      {/* <MuiThemeProvider theme={theme}> */}
        <MaterialTable
          components={{
            Toolbar: props => (
              <div>
                <MTableToolbar {...props} />
                <div style={{padding: '0px 10px'}}>
                 {
                  num != 0 ? (
                    <p>Total R${num}</p>
                  ) : (
                    <p></p>
                  )
                 }
                </div>
              </div>
            ),
          }}
          options={{
            selection: true,
            defaultExpanded: true,
            pageSize:2,       // make initial page size
            emptyRowsWhenPaging: false,   // To avoid of having empty rows
            pageSizeOptions:[10,20,30],    // rows selection options
            // headerStyle: {
            //   backgroundColor: 'white',
            //   color: 'black',              
            // },
            // rowStyle: {
            //   backgroundColor: 'grey',
            //   color: 'white'
            // }
          }}
          actions={[
            {
              icon: 'calculate',
              tooltip: 'All Price',
              onClick: (event, rowData) => {
                let totalPrice = 0;
                rowData?.forEach((x) => {
                  totalPrice = totalPrice + x.price
                })
                setNum(totalPrice)
              }
            },
            {
              icon: 'backspace',
              tooltip: 'clear',
              isFreeAction: true,
              onClick: (event, rowData) => {
                setNum(0)
              }
            }
          ]}
          isLoading={false}
          columns={[
            { title: 'Inicio', field: 'start_time', type: 'datetime', dateSetting: { locale: 'pt-BR' } },
            { title: 'Email do cliente', field: 'client_name' },
            { title: 'Preço (R$)', field: 'price', type: 'numeric' },
            // { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
          ]}
          data={users}
          title="Registro de vendas"
          
        />
        {/* </MuiThemeProvider> */}
      </div>
    </>
  )
}

export default withProtected(Home)