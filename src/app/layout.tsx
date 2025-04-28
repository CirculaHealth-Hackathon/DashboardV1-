import type {Metadata} from 'next';
import { Inter } from 'next/font/google'; // Use Inter font
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

const inter = Inter({ subsets: ['latin'] }); // Initialize Inter font

export const metadata: Metadata = {
  title: 'Circula', // Update title
  description: 'Circulating blood to those who need it the most.', // Update description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Apply Inter font to the body */}
      <body className={`${inter.className} antialiased bg-background`}>
        {children}
        <Toaster /> {/* Add Toaster here */}
      </body>
    </html>
  );
}
