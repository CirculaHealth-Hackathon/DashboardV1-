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
import * as React from 'react';
import { useToast } from "@/hooks/use-toast";

// Dummy data matching the structure in blood-supply/page.tsx
const dummyBloodData = [
  {
    bloodType: "A+",
    amount: "100 Unit", // Available stock
    hospital: "Rumah Sakit Hermina",
    location: "Yogyakarta",
    bloodCode: "XXX0121",
    price: 600000, // Price per unit
  },
   {
    bloodType: "A-",
    amount: "50 Unit",
    hospital: "Palang Merah Indonesia",
    location: "Jakarta",
    bloodCode: "XXX0122",
    price: 550000,
  },
    {
    bloodType: "B+",
    amount: "75 Unit",
    hospital: "Palang Merah Indonesia",
    location: "Bandung",
    bloodCode: "XXX0123",
    price: 580000,
  },
    {
    bloodType: "O+",
    amount: "120 Unit",
    hospital: "RSUP Dr. Sardjito",
    location: "Yogyakarta",
    bloodCode: "XXX0124",
    price: 620000,
  },
    {
    bloodType: "O-",
    amount: "30 Unit",
    hospital: "Rumah Sakit Hermina",
    location: "Yogyakarta",
    bloodCode: "XXX0125",
    price: 700000,
  },
     {
    bloodType: "AB+",
    amount: "40 Unit",
    hospital: "RS Pondok Indah",
    location: "Jakarta",
    bloodCode: "XXX0126",
    price: 650000,
  },
  {
    bloodType: "B-",
    amount: "20 Unit",
    hospital: "RS Borromeus",
    location: "Bandung",
    bloodCode: "XXX0127",
    price: 680000,
  },
];

interface BloodData {
  bloodType: string;
  amount: string; // Available amount
  hospital: string;
  location: string;
  bloodCode: string;
  price: number;
}

export default function ConfirmOrderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bloodCode = searchParams.get('bloodCode');
  const amount = searchParams.get('amount');
  const paymentMethod = searchParams.get('paymentMethod');

  const [userName, setUserName] = useState<string>("Unknown");
  const [userInitial, setUserInitial] = useState<string>("?");
  const [isMounted, setIsMounted] = useState(false);
  const [bloodData, setBloodData] = useState<BloodData | undefined>(undefined);
  const { toast } = useToast();

  const requestAmount = parseInt(amount || "1");
  const totalPrice = bloodData ? bloodData.price * requestAmount : 0;

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

    // Fetch blood data based on bloodCode
    const selectedData = dummyBloodData.find((data) => data.bloodCode === bloodCode);
    setBloodData(selectedData);

  }, [bloodCode, router]);

  const handleLogout = () => {
    localStorage.removeItem("circulaUserData");
    router.push('/login');
  };

  const handleConfirmOrder = () => {
    // Placeholder for actual order confirmation logic (e.g., API call)
    console.log("Order confirmed:", {
        bloodCode,
        amount,
        paymentMethod,
        totalPrice,
        destination: "Rumah Sakit Siloam Jakarta", // Example destination
    });
     toast({
      title: "Order Confirmed",
      description: "Your blood request has been successfully submitted.",
    });
    // Redirect to a success page or back to the main data page
    router.push('/blood-supply');
  };

  if (!isMounted) {
    return null;
  }

  if (!bloodData || !paymentMethod) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p>Missing required order information.</p>
      </div>
    );
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
            Blood Request Confirmation
        </h1>

        <Card className="w-full max-w-lg shadow-md">
          <CardContent className="p-6 space-y-4">
            {/* Order Details */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-muted-foreground">Blood Type:</span>
              <span className="font-medium">{bloodData.bloodType}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-muted-foreground">Amount:</span>
              <span className="font-medium">{requestAmount} unit</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-muted-foreground">Hospital/Organization:</span>
              <span className="font-medium text-right">{bloodData.hospital}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-muted-foreground">Location:</span>
              <span className="font-medium">{bloodData.location}</span>
            </div>
             <div className="flex items-center justify-between">
              <span className="font-semibold text-muted-foreground">Blood Code:</span>
              <span className="font-medium text-muted-foreground">{bloodData.bloodCode}</span> {/* Example blood code */}
            </div>
             <div className="flex items-center justify-between">
              <span className="font-semibold text-muted-foreground">Destination:</span>
              <span className="font-medium">Rumah Sakit Siloam Jakarta</span> {/* Example Destination */}
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-muted-foreground">Payment Method:</span>
              <span className="font-medium">{paymentMethod}</span>
            </div>

             {/* Separator */}
             <hr className="my-4 border-border"/>

            {/* Confirm Order Section */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">Confirm Order</span>
              <span className="font-bold text-lg text-primary">Rp{totalPrice.toLocaleString("id-ID")}</span>
            </div>

            {/* Confirm Order Button */}
            <Button
                className="w-full bg-[#FFA500] hover:bg-[#FF8C00] text-white h-11 mt-6"
                onClick={handleConfirmOrder}
            >
                Confirm Order
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
