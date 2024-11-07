import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '../app/images/cafe.png'; // Đảm bảo logo của bạn đã được lưu trong thư mục public

function DynamicPage() {
  const router = useRouter();

  // Xác định tiêu đề dựa trên đường dẫn hiện tại
  const pageTitle = (() => {
    switch (router.pathname) {
      case '/':
        return 'Home';
      case '/home':
        return 'Dashboard';
      case '/login':
        return 'Login';
      default:
        return 'BXC'; // Tiêu đề mặc định cho các route khác
    }
  })();

  return (
    <>
      <Head>
        <title>{`BXC - ${pageTitle}`}</title> {/* Đặt tên trang với logo trong tiêu đề */}
        {/* Nếu bạn muốn sử dụng logo trong favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center">
        {/* Logo hiển thị trước tiêu đề */}
        <Image src={logo} alt="Logo" width={40} height={40} />
        <h1 className="ml-2">{pageTitle}</h1> {/* Tiêu đề trang sau logo */}
      </div>
    </>
  );
}

export default DynamicPage;
