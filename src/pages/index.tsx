import Head from 'next/head';
import { withPublic } from '../hook/route';

const Home = () => {
  return (
    
    <div>
       <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </div>
  );
}

export default withPublic(Home)