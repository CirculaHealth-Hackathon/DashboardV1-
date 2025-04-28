import Image from 'next/image';
import { SignUpForm } from '@/components/auth/signup-form';
import { Card } from '@/components/ui/card'; // Import Card for consistent styling

export default function SignUpPage() {
  // Use a placeholder image as direct image upload isn't possible here.
  // Replace src with the actual image path if hosted locally or a different URL.
  const imageUrl = "https://picsum.photos/seed/formifysignup/800/1000"; // Placeholder landscape image resembling the sunset scene

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 lg:p-0">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-lg shadow-lg">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 flex items-center justify-center bg-card">
           {/* Wrap form in Card for consistent styling and background */}
           <SignUpForm />
        </div>

        {/* Image Section - Hidden on small screens, shown on large screens */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <Image
            src={imageUrl}
            alt="Sign up illustration"
            layout="fill"
            objectFit="cover" // Ensures the image covers the div
            priority // Prioritize loading this image
          />
           {/* Optional overlay for better text visibility if needed
           <div className="absolute inset-0 bg-black opacity-20"></div>
           */}
        </div>
      </div>
    </main>
  );
}
