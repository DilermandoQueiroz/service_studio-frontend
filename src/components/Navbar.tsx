import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router'
import useAuth from '../hook/auth';
import nookies from 'nookies'

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [activeTwo, setActiveTwo] = useState(false);
  const [sellMenu, setSellMenu] = useState(false);
  const [registerMenu, setRegisterMenu] = useState(false);

  const { user, logout } = useAuth();
  const router = useRouter()

  const handleClick = () => {
    setActive(!active);
    setRegisterMenu(false)
    setSellMenu(false)
  };

  const registerHandleClick = () => {
    setRegisterMenu(!registerMenu);

  };

  const sellHandleClick = () => {
    setSellMenu(!sellMenu);
  };

  const deleteAccount = async () => {
    handleClick()
    const options = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${nookies.get(null, "__session")["__session"]}`,
        "Access-Control-Allow-Origin": "*"
      }
    }
    const endpoint = process.env.NEXT_PUBLIC_API_ROUTE + 'provider/remove'
    const response = await fetch(endpoint, options)
    const data = await response.json();
    console.log(data)
  }

  const register = () => {
    return (
      <>
        <div>
          <div onClick={registerHandleClick} className='cursor-pointer button-movement w-full px-3 py-2 rounded font-bold items-center justify-center'>
            Inscrever {!registerMenu ? ">" : "∨"}
          </div>
        </div>
        <div className={`${registerMenu ? '' : 'hidden'}`}>
          {
            !user &&
            <div className='ml-2.5 items-start flex flex-col'>
              <Link href='/signup'>
                <a onClick={handleClick} className='w-full px-3 py-2 rounded font-bold items-center justify-center'>
                  ** Tatuador
                </a>
              </Link>
            </div>
          }
          {
            user &&
            <div className='ml-2.5 items-start flex flex-col'>
              <Link href='/client/signup'>
                <a onClick={handleClick} className='w-full px-3 py-2 rounded font-bold items-center justify-center'>
                  ** Cliente
                </a>
              </Link>
              <Link href='/studio/create'>
                <a onClick={handleClick} className='button-movement w-full px-3 py-2 rounded font-bold items-center justify-center'>
                  ** Estúdio
                </a>
              </Link>
            </div>
          }
        </div>
      </>
    )
  }

  
  const sell = () => {

    return (
      <>
        {
          user &&
          <div>
            <div onClick={sellHandleClick} className='cursor-pointer button-movement w-full px-3 py-2 rounded font-bold items-center justify-center'>
              Vendas {!sellMenu ? ">" : "∨"}
            </div>
            <div className={`${sellMenu ? '' : 'hidden'}`}>
              <div>
                <Link href='/home/sell'>
                  <a onClick={handleClick} className='mt-2 button-movement ml-2.5 w-full px-3 py-2 rounded font-bold items-center justify-center'>
                    ** Registrar
                  </a>
                </Link>
              </div>
              <div>
                <Link href='home/history'>
                  <a onClick={handleClick} className='button-movement ml-2.5 w-full px-3 py-2 rounded font-bold items-center justify-center'>
                    ** Histórico
                  </a>
                </Link>
              </div>
              <div>
                <Link href='/home/clients'>
                  <a onClick={handleClick} className='button-movement ml-2.5 w-full px-3 py-2 rounded font-bold items-center justify-center'>
                    ** Clientes
                  </a>
                </Link>
              </div>
            </div>
          </div>
        }

      </>
    )
  }

  const privado = () => {
    return (
      <>
        <Link href='/home'>
          <a onClick={handleClick} className='button-movement w-full px-3 py-2 rounded font-bold items-center justify-center'>
            Tatuador
          </a>
        </Link>
        <Link href='/studio'>
          <a onClick={handleClick} className='button-movement w-full px-3 py-2 rounded font-bold items-center justify-center'>
            Estúdio
          </a>
        </Link>
        
      </>
    )
  }


  return (
    <>
      <nav className='max-w-6xl m-auto flex items-center flex-wrap p-4 '>
        <Link href='/'>
          <a className='inline-flex items-center mr-4 '>
            <span className='text-xl text-black font-bold uppercase tracking-wide'>
              EASE SERVICE
            </span>
          </a>
        </Link>
        {
          user ? (
            <Link href="/">
              <button onClick={logout} className='button-movement inline-flex p-3 bg-black rounded text-white ml-auto outline-none mr-2.5'>Sair</button>
            </Link>
          ) : (
            <Link href="/login">
              <button className='button-movement inline-flex p-3 bg-black rounded text-white ml-auto outline-none mr-2.5'>Entrar</button>
            </Link>
          )
        }

        <button
          className='inline-flex p-3 bg-black  rounded text-white ml-auto outline-none ml-0'
          onClick={handleClick}>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
        {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
        <div
          className={`${active ? '' : 'hidden'
            }   w-full `}
        >
          <div className='items-start  flex flex-col'>
            {user && privado()}
            {register()}
            {sell()}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar
