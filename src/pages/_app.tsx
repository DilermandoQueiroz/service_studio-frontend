import '../../styles/tailwind.css'
import Navbar from '../components/Navbar'
import "../config/firebase";
import { AppProps } from 'next/app';

import { AuthProvider } from "../hook/auth";
import AuthStateChanged from "../layout/AuthStateChanged";
import { ReactNotifications } from 'react-notifications-component'

import 'react-notifications-component/dist/theme.css'

function MyApp({ Component, pageProps }: AppProps) {

	return (
		<AuthProvider>
			
			<ReactNotifications />
			<Navbar />
			<AuthStateChanged>
				<Component {...pageProps} />
			</AuthStateChanged>
		</AuthProvider>
	);

}

export default MyApp
