
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CirculaLogo } from '@/components/icons/circula-logo';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the signup page after 5 seconds
    const timer = setTimeout(() => {
      router.push('/signup');
    }, 5000); // 5000 milliseconds = 5 seconds

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <CirculaLogo className="h-12 w-auto text-primary animate-pulse" /> {/* Increased size and added pulse animation */}
    </main>
  );
}
