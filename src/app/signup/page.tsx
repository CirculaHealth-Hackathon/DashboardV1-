import Image from 'next/image';
import { SignUpForm } from '@/components/auth/signup-form';
import { CirculaLogo } from '@/components/icons/circula-logo'; // Import the logo component

export default function SignUpPage() {
  const imageUrl = "https://picsum.photos/seed/circulasignup/800/1000"; // Placeholder image

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4 lg:p-8">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-lg shadow-lg bg-card">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <CirculaLogo className="h-8 w-auto text-primary" />
          </div>
          <SignUpForm />
        </div>

        {/* Image Section */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <Image
            src={imageUrl}
            alt="People watching a sunset"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
          <div className="absolute bottom-10 left-10 text-white p-4">
            <h2 className="text-3xl font-semibold leading-tight">
              Circulating blood to <span className="text-primary">those</span> who <span className="text-primary">need it the most</span>
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
}
