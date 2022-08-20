import '../../styles/tailwind.css'
import Navbar from '../components/Navbar'
import "../config/firebase";
import { AppProps } from 'next/app';

import { AuthProvider } from "../hook/auth";
import AuthStateChanged from "../layout/AuthStateChanged";

function MyApp({ Component, pageProps }: AppProps) {

  return (
		<AuthProvider>
      <Navbar/>
			<AuthStateChanged>
				<Component {...pageProps} />
			</AuthStateChanged>
		</AuthProvider>
	);
   
}

export default MyApp
