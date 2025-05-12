
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft, ChevronRight } from "lucide-react"; 
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; 
import { Label } from "@/components/ui/label"; 
import * as React from 'react';
import Image from 'next/image'; // Import Image component

const LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/fbtools-internal-prod.appspot.com/o/static%2Fmaker-images%2F08417035-a55b-4993-829d-35641b92c9ce?alt=media&token=610e2d18-69c7-47d4-a1b8-c068077314f4";


const dummyPrices: { [key: string]: number } = {
  "XXX0121": 600000,
  "XXX0122": 550000,
  "XXX0123": 580000,
  "XXX0124": 620000,
  "XXX0125": 700000,
  "XXX0126": 650000,
  "XXX0127": 680000,
};


export default function SelectPaymentMethodPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bloodCode = searchParams.get('bloodCode');
  const amount = searchParams.get('amount');
  const [userName, setUserName] = useState<string>("Unknown");
  const [userInitial, setUserInitial] = useState<string>("?");
  const [isMounted, setIsMounted] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | undefined>(undefined);

  const unitPrice = bloodCode ? (dummyPrices[bloodCode] || 600000) : 600000; 
  const totalPrice = unitPrice * parseInt(amount || "1");

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
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("circulaUserData");
    router.push('/login');
  };

  const handlePay = () => {
    if (!selectedPaymentMethod) {
        console.error("Please select a payment method.");
        return;
    }
    console.log("Proceeding to confirm order with payment method:", selectedPaymentMethod);
    router.push(`/confirm-order?bloodCode=${bloodCode}&amount=${amount}&paymentMethod=${selectedPaymentMethod}`);
  };

  if (!isMounted) {
    return null;
  }

  if (!bloodCode || !amount) {
     return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
            <p>Missing required information (blood code or amount).</p>
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
        <header className="container mx-auto px-4 py-4 flex justify-between items-center border-b">
            <div onClick={() => router.push('/blood-supply')} className="cursor-pointer">
              <Image src={LOGO_URL} alt="Circula Logo" width={156} height={32} />
            </div>
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

      <main className="container mx-auto px-4 py-12 flex flex-col items-center">
         <h1 className="text-3xl font-bold mb-8 text-center flex items-center">
            <Button variant="ghost" onClick={() => router.back()} className="mr-2">
                <ArrowLeft />
            </Button>
            Select Your Payment Method
        </h1>

        <Card className="w-full max-w-lg shadow-md">
          <CardContent className="p-6 space-y-6">
            <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="space-y-4">
              <Label htmlFor="wallet" className="flex items-center justify-between p-4 rounded-md border has-[:checked]:border-primary">
                  <span>Use Funds from My Wallet</span>
                  <RadioGroupItem value="My Wallet" id="wallet" />
              </Label>
              <Label htmlFor="qris" className="flex items-center justify-between p-4 rounded-md border has-[:checked]:border-primary">
                  <span>Pay with QRIS</span>
                  <RadioGroupItem value="QRIS" id="qris" />
              </Label>
              <Label htmlFor="ewallet" className="flex items-center justify-between p-4 rounded-md border has-[:checked]:border-primary cursor-pointer group">
                  <div className="flex-grow">
                      <span>Pay with </span>
                      <span className="text-blue-500 font-medium">Gopay</span>,{' '}
                      <span className="text-red-500 font-medium">ShopeePay</span>,{' '}
                      <span className="text-indigo-500 font-medium">OVO</span>
                  </div>
                  <RadioGroupItem value="E-Wallet" id="ewallet" className="sr-only" />
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
              </Label>
              <Label htmlFor="va" className="flex items-center justify-between p-4 rounded-md border has-[:checked]:border-primary cursor-pointer group">
                   <div className="flex-grow">
                      <span>Pay with Virtual Account </span>
                      <span className="text-blue-500 font-medium">BCA</span>,{' '}
                      <span className="text-orange-500 font-medium">Mandiri</span>
                  </div>
                  <RadioGroupItem value="Virtual Account" id="va" className="sr-only" />
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
              </Label>
              <Label htmlFor="idrx" className="flex items-center justify-between p-4 rounded-md border has-[:checked]:border-primary">
                  <span>Pay with IDRX</span>
                  <RadioGroupItem value="IDRX" id="idrx" />
              </Label>
            </RadioGroup>

             <div className="flex items-center justify-between mt-8">
              <span className="font-semibold text-lg">Rp{totalPrice.toLocaleString("id-ID")}</span>
              <span className="text-sm text-muted-foreground">Includes taxes and other fees</span>
            </div>

            <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 mt-6"
                onClick={handlePay}
                disabled={!selectedPaymentMethod} 
            >
                Pay
            </Button>

          </CardContent>
        </Card>
      </main>

      <footer className="container mx-auto px-4 py-6 mt-12 border-t text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} Circula. All rights reserved.
      </footer>
    </div>
  );
}
