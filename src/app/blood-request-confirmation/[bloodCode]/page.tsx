"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { ArrowLeft, Minus, Plus } from "lucide-react";
import Link from "next/link";
import * as React from 'react';

// Dummy data matching the structure in blood-supply/page.tsx
const dummyBloodData = [
  {
    bloodType: "A+",
    amount: "100 Unit", // This represents available stock, not requested amount initially
    hospital: "Rumah Sakit Hermina",
    location: "Yogyakarta", // Example location, match with selected data
    bloodCode: "XXX0121",
    distance: "6 km",
    dateUploaded: "Jan 10, 2025 10:10 WIB", // Use date string directly
    price: 600000, // Price per unit
  },
   {
    bloodType: "A-",
    amount: "50 Unit",
    hospital: "Palang Merah Indonesia",
    location: "Jakarta",
    bloodCode: "XXX0122",
    distance: "10 km",
    dateUploaded: "Jan 10, 2025 09:45 WIB",
    price: 550000,
  },
    {
    bloodType: "B+",
    amount: "75 Unit",
    hospital: "Palang Merah Indonesia",
    location: "Bandung",
    bloodCode: "XXX0123",
    distance: "25 km",
    dateUploaded: "Jan 09, 2025 15:30 WIB",
    price: 580000,
  },
    {
    bloodType: "O+",
    amount: "120 Unit",
    hospital: "RSUP Dr. Sardjito",
    location: "Yogyakarta",
    bloodCode: "XXX0124",
    distance: "25 km",
    dateUploaded: "Jan 09, 2025 11:00 WIB",
    price: 620000,
  },
    {
    bloodType: "O-",
    amount: "30 Unit",
    hospital: "Rumah Sakit Hermina",
    location: "Yogyakarta",
    bloodCode: "XXX0125",
    distance: "32 km",
    dateUploaded: "Jan 08, 2025 16:20 WIB",
    price: 700000,
  },
     {
    bloodType: "AB+",
    amount: "40 Unit",
    hospital: "RS Pondok Indah",
    location: "Jakarta",
    bloodCode: "XXX0126",
    distance: "15 km",
    dateUploaded: "Jan 10, 2025 11:15 WIB",
    price: 650000,
  },
  {
    bloodType: "B-",
    amount: "20 Unit",
    hospital: "RS Borromeus",
    location: "Bandung",
    bloodCode: "XXX0127",
    distance: "28 km",
    dateUploaded: "Jan 09, 2025 10:05 WIB",
    price: 680000,
  },
];

interface BloodData {
  bloodType: string;
  amount: string; // Available amount
  hospital: string;
  location: string;
  bloodCode: string;
  distance: string;
  dateUploaded: string; // Use string directly
  price: number;
}

interface Props {
  params: { bloodCode: string };
}

export default function BloodRequestConfirmationPage({ params }: Props) {
  const { bloodCode: bloodCodeParam } = params;
  const bloodCode = React.use(React.useMemo(() => Promise.resolve(bloodCodeParam), [bloodCodeParam]));
  const [bloodData, setBloodData] = useState<BloodData | undefined>(undefined);
  const [requestAmount, setRequestAmount] = useState(1); // Default request amount
  const router = useRouter();
  const [userName, setUserName] = useState<string>("Unknown");
  const [userInitial, setUserInitial] = useState<string>("?");
  const [isMounted, setIsMounted] = useState(false);

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

    const selectedData = dummyBloodData.find((data) => data.bloodCode === bloodCode);
    setBloodData(selectedData);
  }, [bloodCode, router]);

  const handleLogout = () => {
    localStorage.removeItem("circulaUserData");
    router.push('/login');
  };

  const incrementAmount = () => {
     if (bloodData) {
      // Example: Don't exceed available amount (parse from string)
      const availableAmount = parseInt(bloodData.amount.split(' ')[0], 10);
      if (requestAmount < availableAmount) {
        setRequestAmount(requestAmount + 1);
      }
    }
  };

  const decrementAmount = () => {
    if (requestAmount > 1) {
      setRequestAmount(requestAmount - 1);
    }
  };

  const handleContinueToPayment = () => {
    // Placeholder for payment logic
    console.log("Proceeding to payment for:", bloodData, "Amount:", requestAmount);
    // router.push('/payment'); // Example redirect
  };

  if (!isMounted) {
    return null;
  }

  if (!bloodData) {
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
                    {/* ... Dropdown items ... */}
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
        <main className="container mx-auto px-4 py-8">
          <p>Blood request data not found.</p>
        </main>
      </div>
    );
  }

  const totalPrice = bloodData.price * requestAmount;

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
          <CardContent className="p-6 space-y-6">
            {/* Row 1: Blood Type */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-muted-foreground">Blood Type:</span>
              <span className="font-medium">{bloodData.bloodType}</span>
            </div>

            {/* Row 2: Amount */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-muted-foreground">Amount:</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={decrementAmount} disabled={requestAmount <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-medium w-12 text-center">{requestAmount} unit</span>
                <Button variant="outline" size="icon" onClick={incrementAmount}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Row 3: Hospital/Organization */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-muted-foreground">Hospital/Organization:</span>
              <span className="font-medium text-right">{bloodData.hospital}</span>
            </div>

            {/* Row 4: Location */}
             <div className="flex items-center justify-between">
              <span className="font-semibold text-muted-foreground">Location:</span>
              <span className="font-medium">{bloodData.location}</span>
            </div>


            {/* Row 5: Distance */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-muted-foreground">Distance:</span>
              <div className="flex flex-col items-end">
                  <span className="font-medium">{bloodData.distance}</span>
                   <span className="text-xs text-muted-foreground border border-dashed border-muted-foreground px-1 py-0.5 rounded">*Will be adjusted based on destination</span>
              </div>
            </div>

             {/* Row 6: Date Uploaded */}
             <div className="flex items-center justify-between">
              <span className="font-semibold text-muted-foreground">Date Uploaded:</span>
              <span className="font-medium">{new Date(bloodData.dateUploaded.replace(' WIB', '')).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>


            {/* Row 7: Delivery Destination */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-muted-foreground">Delivery Destination:</span>
              <Button variant="outline" size="sm">Use My Usual Location</Button>
            </div>

             {/* Separator */}
             <hr className="my-4 border-border"/>


             {/* Row 8: Price */}
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">Price</span>
              <span className="font-bold text-lg">Rp{totalPrice.toLocaleString("id-ID")}</span>
            </div>


            {/* Row 9: Continue Button */}
            <Button className="w-full bg-[#FF8C00] hover:bg-[#FFA500] text-white" onClick={handleContinueToPayment}>
                Continue to Payment
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


