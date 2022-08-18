import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'



const Navbar = () => {
  const [active, setActive] = useState(false);
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleClick = () => {
    console.log("############ navibarrr #####")
    console.log(user)
    setActive(!active);
  };

  return (
    <>
      <nav className='flex items-center flex-wrap bg-sky-400 p-3 '>
        <Link href='/'>
          <a className='inline-flex items-center p-2 mr-4 '>
            <span className='text-xl text-white font-bold uppercase tracking-wide'>
              EASE SERVICE
            </span>
          </a>
        </Link>
          {user ? (
              <Link href="/">
                <button onClick={() => {
                  logout()
                }} className='inline-flex p-3 hover:bg-sky-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none'>Logout</button>
              </Link>
            ) : (
              <Link href="/login">
                <button className='inline-flex p-3 hover:bg-sky-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none'>Sign in</button>
              </Link>
            )
          }
        
        <button
          className='inline-flex p-3 hover:bg-sky-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none ml-0'
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
          className={`${
            active ? '' : 'hidden'
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto'>
          {!user ? (
              <Link href='/signup' >
                <a onClick={handleClick} className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-sky-600 hover:text-white '>
                  Sign up
                </a>
              </Link>
            ) : (
              <Link href='/servicesProviders'>
              <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-sky-600 hover:text-white'>
                Services Providers
              </a>
            </Link>
            )
          }
           
            <Link href='/'>
              <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-sky-600 hover:text-white'>
                About us
              </a>
            </Link>
            <Link href='/'>
              <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-sky-600 hover:text-white'>
                Contact us
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar
