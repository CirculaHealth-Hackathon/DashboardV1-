
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { LOGO_URL } from '@/lib/constants';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/signup');
    }, 5000); 

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <Image
        src={LOGO_URL}
        alt="Circula Logo"
        width={312} 
        height={64} 
        className="animate-pulse"
        priority
      />
    </main>
  );
}
