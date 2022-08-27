import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router'
import { withPublic } from "../hook/route";
import useAuth from '../hook/auth';



const Navbar = () => {
  const [active, setActive] = useState(false);
  const { user, logout  } = useAuth();
	console.log(user);
  const router = useRouter()

  const handleClick = () => {
    console.log("############ navibarrr #####")
    setActive(!active);
  };

  return (
    <>
      <nav className='flex items-center flex-wrap bg-white p-3 '>
        <Link href='/'>
          <a className='inline-flex items-center p-2 mr-4 '>
            <span className='text-xl text-black font-bold uppercase tracking-wide'>
              EASE SERVICE
            </span>
          </a>
        </Link>
          {user ? (
              <Link href="/">
                <button onClick={() => {
                  logout()
                }} className='inline-flex p-3 bg-black rounded lg:hidden text-white ml-auto outline-none mr-2.5'>Logout</button>
              </Link>
            ) : (
              <Link href="/login">
                <button className='inline-flex p-3 bg-black rounded lg:hidden text-white ml-auto outline-none mr-2.5'>Sign in</button>
              </Link>
            )
          }
        
        <button
          className='inline-flex p-3 bg-black  rounded lg:hidden text-white ml-auto outline-none ml-0'
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
            {!user &&
                <Link href='/signup' >
                  <a onClick={handleClick} className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded font-bold items-center justify-center'>
                    Sign up
                  </a>
                </Link>
            }
            <Link href='/servicesProviders'>
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded font-bold items-center justify-center'>
                  Services Providers 
                </a>
            </Link>
            {user && 
            <Link href='/'>
              <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded font-bold items-center justify-center'>
                Your Profile
              </a>
            </Link>}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar
