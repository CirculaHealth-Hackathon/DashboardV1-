
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Import Image component

const LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/fbtools-internal-prod.appspot.com/o/static%2Fmaker-images%2F08417035-a55b-4993-829d-35641b92c9ce?alt=media&token=610e2d18-69c7-47d4-a1b8-c068077314f4";

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
      {/* Use the Image component with specified width and height */}
      <Image 
        src={LOGO_URL} 
        alt="Circula Logo" 
        width={312} // Adjusted width for aspect ratio: (1036/212) * 64 height
        height={64}  // Let's use h-16 (64px) for splash
        className="animate-pulse" 
        priority 
      />
    </main>
  );
}
