import '../styles/tailwind.css'
import Navbar from '../components/Navbar'
import { AuthContextProvider } from '../context/AuthContext'
import { useRouter } from 'next/router'
import ProtectedRoute from '../components/ProtectedRoute'
import { AppProps } from 'next/app';

const noAuthRequired = ['/', '/login', '/signup', '/signupEmailVerify']

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter()

  return (
    <AuthContextProvider>
      <Navbar />
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  )
   
}

export default MyApp
