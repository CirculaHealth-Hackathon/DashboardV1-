
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CirculaCPlusLogo } from '@/components/icons/circula-c-plus-logo'; // Import the new logo

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
      {/* Use the new logo component and adjust size */}
      <CirculaCPlusLogo className="h-24 w-24 text-primary animate-pulse" />
    </main>
  );
}
