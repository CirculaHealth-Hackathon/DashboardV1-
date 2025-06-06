
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { ArrowLeft, Minus, Plus } from "lucide-react";
import Link from "next/link";
import * as React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import Image from 'next/image';
import { LOGO_URL } from "@/lib/constants";
import type { Order } from "../../confirm-order/page";

const dummyBloodData = [
  {
    bloodType: "A+",
    amount: "100 Unit",
    hospital: "Rumah Sakit Hermina",
    location: "Yogyakarta",
    bloodCode: "XXX0121",
    distance: "6 km",
    dateUploaded: "Jan 10, 2025 10:10 WIB",
    price: 600000,
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
  amount: string;
  hospital: string;
  location: string;
  bloodCode: string;
  distance: string;
  dateUploaded: string;
  price: number;
}

interface Props {
  params: { bloodCode: string };
}

export default function BloodRequestConfirmationPage({ params }: Props) {
  const bloodCode = React.use(React.useMemo(() => Promise.resolve(params.bloodCode), [params.bloodCode]));
  const [bloodData, setBloodData] = useState<BloodData | undefined>(undefined);
  const [requestAmount, setRequestAmount] = useState(1);
  const router = useRouter();
  const [userName, setUserName] = useState<string>("Unknown");
  const [userInitial, setUserInitial] = useState<string>("?");
  const [isMounted, setIsMounted] = useState(false);
  const [ongoingOrdersCount, setOngoingOrdersCount] = useState(0);

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

    const storedOrdersString = localStorage.getItem("circulaUserOrders");
    if (storedOrdersString) {
      const orders: Order[] = JSON.parse(storedOrdersString);
      setOngoingOrdersCount(orders.filter(order => order.status === 'Ongoing').length);
    }
  }, [bloodCode]);

  const handleLogout = () => {
    localStorage.removeItem("circulaUserData");
    router.push('/login');
  };

  const incrementAmount = () => {
     if (bloodData) {
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
    console.log("Proceeding to payment for:", bloodData, "Amount:", requestAmount);
    router.push(`/select-payment-method?bloodCode=${bloodCode}&amount=${requestAmount}`);
  };

  if (!isMounted) {
    return null;
  }

  if (!bloodData) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <header className="container mx-auto px-4 py-4 flex justify-between items-center border-b">
            <div onClick={() => router.push('/blood-supply')} className="cursor-pointer">
              <Image src={LOGO_URL} alt="Circula Logo" width={156} height={32} priority />
            </div>
             <div className="flex items-center gap-4">
                <Button variant="outline" className="border-border" onClick={() => router.push('/blood-supply')}>Database</Button>
                 <Button variant="outline" className="border-border" onClick={() => router.push('/my-orders')}>
                  My Orders
                  {ongoingOrdersCount > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-destructive-foreground bg-destructive rounded-full">
                      {ongoingOrdersCount}
                    </span>
                  )}
                </Button>
                <Button variant="outline" className="border-border" onClick={() => router.push('/input-data')}>Input Data</Button>
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
                          <DropdownMenuItem onClick={() => router.push('/my-wallet')}>My Wallet</DropdownMenuItem>
                          <DropdownMenuItem>My Profile</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
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
        <header className="container mx-auto px-4 py-4 flex justify-between items-center border-b">
            <div onClick={() => router.push('/blood-supply')} className="cursor-pointer">
              <Image src={LOGO_URL} alt="Circula Logo" width={156} height={32} priority />
            </div>
            <div className="flex items-center gap-4">
                <Button variant="outline" className="border-border" onClick={() => router.push('/blood-supply')}>Database</Button>
                 <Button variant="outline" className="border-border" onClick={() => router.push('/my-orders')}>
                  My Orders
                  {ongoingOrdersCount > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-destructive-foreground bg-destructive rounded-full">
                      {ongoingOrdersCount}
                    </span>
                  )}
                </Button>
                <Button variant="outline" className="border-border" onClick={() => router.push('/input-data')}>Input Data</Button>
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
                          <DropdownMenuItem onClick={() => router.push('/my-wallet')}>My Wallet</DropdownMenuItem>
                          <DropdownMenuItem>My Profile</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>

      <main className="container mx-auto px-4 py-12 flex flex-col items-center">
         <h1 className="text-3xl font-bold mb-8 text-center flex items-center">
            <Button variant="ghost" onClick={() => router.back()} className="mr-2">
                <ArrowLeft />
            </Button>
            Blood Request Confirmation
        </h1>

        <Card className="w-full max-w-lg shadow-md">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-muted-foreground">Blood Type:</span>
              <span className="font-medium">{bloodData.bloodType}</span>
            </div>

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

            <div className="flex items-center justify-between">
              <span className="font-semibold text-muted-foreground">Hospital/Organization:</span>
              <span className="font-medium text-right">{bloodData.hospital}</span>
            </div>

             <div className="flex items-center justify-between">
              <span className="font-semibold text-muted-foreground">Location:</span>
              <span className="font-medium">{bloodData.location}</span>
            </div>


            <div className="flex items-center justify-between">
              <span className="font-semibold text-muted-foreground">Distance:</span>
              <div className="flex flex-col items-end">
                  <span className="font-medium">{bloodData.distance}</span>
                   <span className="text-xs text-muted-foreground border border-dashed border-muted-foreground px-1 py-0.5 rounded">*Will be adjusted based on destination</span>
              </div>
            </div>

             <div className="flex items-center justify-between">
              <span className="font-semibold text-muted-foreground">Date Uploaded:</span>
              <span className="font-medium">{new Date(bloodData.dateUploaded.replace(' WIB', '')).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>


            <div className="flex items-center justify-between">
              <span className="font-semibold text-muted-foreground">Delivery Destination:</span>
              <Button variant="outline" size="sm">Use My Usual Location</Button>
            </div>

             <hr className="my-4 border-border"/>


            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">Price</span>
              <span className="font-bold text-lg">Rp{totalPrice.toLocaleString("id-ID")}</span>
            </div>


            <Button className="w-full bg-[#FF8C00] hover:bg-[#FFA500] text-white" onClick={handleContinueToPayment}>
                Continue to Payment
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
