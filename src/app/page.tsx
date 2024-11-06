// src/app/page.tsx
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, [router]);

  return null; 
  };
  
  export default HomePage;
  