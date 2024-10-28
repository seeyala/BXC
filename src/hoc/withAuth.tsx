import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ComponentType } from 'react';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const Auth: React.FC<P> = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Kiểm tra xem mã có đang chạy trên client-side không
        if (typeof window !== 'undefined') {
          const accessToken = localStorage.getItem('accessToken');
          if (!accessToken) {
            router.push('/login');
          } else {
            setLoading(false);
          }
        }
      }, [router]);
      if (loading) {
        return;
      }
    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;
