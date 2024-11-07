import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '../app/images/cafe.png';

function DynamicPage() {
  const router = useRouter();
  const pageTitle = (() => {
    switch (router.pathname) {
      case '/':
        return 'Home';
      case '/home':
        return 'Dashboard';
      case '/login':
        return 'Login';
      default:
        return 'BXC';
    }
  })();

  return (
    <>
      <Head>
        <title>{`BXC - ${pageTitle}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center">
        <Image src={logo} alt="Logo" width={40} height={40} />
        <h1 className="ml-2">{pageTitle}</h1>
      </div>
    </>
  );
}

export default DynamicPage;
