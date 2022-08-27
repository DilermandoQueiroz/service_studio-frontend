import Head from 'next/head';
import useAuth from '../hook/auth';

const Home = () => {
  const { user } = useAuth();
	console.log(user);
  return (
    
    <div>
       <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </div>
  );
}

export default Home