"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CirculaLogo } from "@/components/icons/circula-logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"; // Import Checkbox
import * as React from 'react';

export default function SelectPaymentMethodPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bloodCode = searchParams.get('bloodCode');
  const amount = searchParams.get('amount');
  const [userName, setUserName] = useState<string>("Unknown");
  const [userInitial, setUserInitial] = useState<string>("?");
  const [isMounted, setIsMounted] = useState(false);
  const totalPrice = 600000 * parseInt(amount || "1"); // Dummy price calculation

  useEffect(() => {
    setIsMounted(true);
    const userData = localStorage.getItem("circulaUserData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      const email = parsedUserData.email || "Unknown";
      const namePart = email.split('@')[0];
      setUserName(namePart || "Unknown");
      setUserInitial(namePart ? namePart.substring(0, 1).toUpperCase() : "?");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("circulaUserData");
    router.push('/login');
  };

  const handlePay = () => {
    // Placeholder for actual payment logic
    console.log("Initiating payment...");
    // router.push('/success'); // Example redirect after successful payment
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
       {/* Header */}
        <header className="container mx-auto px-4 py-4 flex justify-between items-center border-b">
            <CirculaLogo className="h-8 w-auto text-primary cursor-pointer" onClick={() => router.push('/blood-supply')} />
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage data-ai-hint="user avatar" src={`https://picsum.photos/seed/${userName}/50/50`} alt={userName} />
                        <AvatarFallback>{userInitial}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                        <Avatar className="mr-2 h-5 w-5">
                            <AvatarImage data-ai-hint="user avatar small" src={`https://picsum.photos/seed/${userName}/50/50`} alt={userName} />
                            <AvatarFallback>{userInitial}</AvatarFallback>
                        </Avatar>
                        <span>{userName}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>My Wallet</DropdownMenuItem>
                    <DropdownMenuItem>My Profile</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex flex-col items-center">
         <h1 className="text-3xl font-bold mb-8 text-center flex items-center">
            <Button variant="ghost" onClick={() => router.back()} className="mr-2">
                <ArrowLeft />
            </Button>
            Select Your Payment Method
        </h1>

        <Card className="w-full max-w-lg shadow-md">
          <CardContent className="p-6 space-y-6">
             {/* Payment Options */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-md border">
                  <span>Use Funds from My Wallet</span>
                  <Checkbox />
              </div>
              <div className="flex items-center justify-between p-4 rounded-md border">
                  <span>Pay with QRIS</span>
                  <Checkbox />
              </div>
               <div className="flex items-center justify-between p-4 rounded-md border">
                  <span>Pay with <span className="text-blue-500">Gpay</span> <span className="text-red-500">ShopeePay</span> <span className="text-indigo-500">OVO</span></span>
                  <ArrowLeft/>
              </div>
              <div className="flex items-center justify-between p-4 rounded-md border">
                  <span>Pay with Virtual Account <span className="text-blue-500">BCA</span> <span className="text-orange-500">Mandiri</span></span>
                  <ArrowLeft/>
              </div>
              <div className="flex items-center justify-between p-4 rounded-md border">
                  <span>Pay with IDRX</span>
                  <Checkbox />
              </div>
            </div>

             {/* Price */}
             <div className="flex items-center justify-between mt-8">
              <span className="font-semibold text-lg">Rp{totalPrice.toLocaleString("id-ID")}</span>
              <span className="text-sm text-muted-foreground">Includes taxes and other fees</span>
            </div>

            {/* Pay Button */}
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 mt-6" onClick={handlePay}>
                Pay
            </Button>

          </CardContent>
        </Card>
      </main>

       {/* Footer Placeholder */}
      <footer className="container mx-auto px-4 py-6 mt-12 border-t text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} Circula. All rights reserved.
      </footer>
    </div>
  );
}

