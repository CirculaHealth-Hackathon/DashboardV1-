import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the signup page immediately
  redirect('/signup');

  // This part will technically not be reached, but kept for potential future use
  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-center p-24">
  //     <h1 className="text-4xl font-bold mb-8">Welcome to Circula</h1>
  //     <p className="text-lg mb-8">Redirecting to sign up...</p>
  //   </main>
  // );
}
