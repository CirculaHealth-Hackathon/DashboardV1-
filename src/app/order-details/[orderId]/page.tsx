"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LOGO_URL } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Truck } from "lucide-react";
import type { Order } from "../../confirm-order/page";

// Re-defining dummyBloodData here or importing from a shared constants file
const dummyBloodData = [
  {
    bloodType: "A+",
    amount: "100 Unit", // Available stock
    hospital: "Rumah Sakit Hermina",
    location: "Yogyakarta",
    bloodCode: "XXX0121",
    distance: "6 km",
    dateUploaded: "Jan 10, 2025 10:10 WIB",
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


interface SupplierData {
  bloodType: string;
  amount: string; // Available stock
  hospital: string;
  location: string;
  bloodCode: string;
  price: number; // Price per unit
}

interface Props {
  params: { orderId: string };
}

export default function OrderDetailsPage({ params }: Props) {
  const orderId = React.use(React.useMemo(() => Promise.resolve(params.orderId), [params.orderId]));
  const router = useRouter();
  const [userName, setUserName] = useState<string>("Unknown");
  const [userInitial, setUserInitial] = useState<string>("?");
  const [isMounted, setIsMounted] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [supplierDetails, setSupplierDetails] = useState<SupplierData | null>(null);

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

    const storedOrdersString = localStorage.getItem("circulaUserOrders");
    if (storedOrdersString && orderId) {
      const allOrders: Order[] = JSON.parse(storedOrdersString);
      const currentOrder = allOrders.find(o => o.id === orderId);
      setOrder(currentOrder || null);

      if (currentOrder) {
        const supDetails = dummyBloodData.find(bd => bd.bloodCode === currentOrder.bloodCode);
        setSupplierDetails(supDetails || null);
      }
    }
  }, [orderId]);

  const handleLogout = () => {
    localStorage.removeItem("circulaUserData");
    router.push('/login');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  if (!isMounted) {
    return null; 
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <header className="container mx-auto px-4 py-4 flex justify-between items-center border-b">
          <div onClick={() => router.push('/blood-supply')} className="cursor-pointer">
            <Image src={LOGO_URL} alt="Circula Logo" width={156} height={32} priority />
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
        <main className="container mx-auto px-4 py-8 text-center">
          <p>Order not found.</p>
           <Button onClick={() => router.push('/my-orders')} className="mt-4">Go to My Orders</Button>
        </main>
      </div>
    );
  }
  
  const ongoingOrdersCount = parseInt(localStorage.getItem('ongoingOrdersCount') || '0');


  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 py-4 flex justify-between items-center border-b">
        <div onClick={() => router.push('/blood-supply')} className="cursor-pointer">
          <Image src={LOGO_URL} alt="Circula Logo" width={156} height={32} priority data-ai-hint="logo" />
        </div>
        <div className="flex items-center gap-4">
            <Button variant="outline" className="border-border" onClick={() => router.push('/blood-supply')}>Database</Button>
            <Button variant="outline" className="border-border" onClick={() => router.push('/my-orders')}>
              My Orders
              {ongoingOrdersCount > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full text-xs">
                  {ongoingOrdersCount}
                </Badge>
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
                <DropdownMenuItem>My Wallet</DropdownMenuItem>
                <DropdownMenuItem>My Profile</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex flex-col items-center">
        <div className="w-full max-w-2xl">
            <div className="flex items-center mb-8">
                <Button variant="ghost" onClick={() => router.push('/my-orders')} className="mr-2">
                    <ArrowLeft />
                </Button>
                <h1 className="text-3xl font-bold">Order Details</h1>
            </div>

            {order.status === "Ongoing" && (
                 <div className="bg-primary/10 border border-primary/30 p-4 rounded-lg mb-6 flex items-center gap-3 shadow-sm">
                    <Badge variant="destructive" className="bg-orange-500 hover:bg-orange-600 text-white mr-2">{order.status}</Badge>
                    <p className="text-sm text-foreground">
                        Delivery to {order.destination} in progress. We'll send a confirmation when your order is complete.
                    </p>
                 </div>
            )}
             {order.status === "Completed" && (
                 <div className="bg-green-100 border border-green-300 p-4 rounded-lg mb-6 flex items-center gap-3 shadow-sm">
                    <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-white mr-2">{order.status}</Badge>
                    <p className="text-sm text-green-700">
                        This order has been completed.
                    </p>
                 </div>
            )}
             {order.status === "Cancelled" && (
                 <div className="bg-red-100 border border-red-300 p-4 rounded-lg mb-6 flex items-center gap-3 shadow-sm">
                    <Badge variant="destructive" className="mr-2">{order.status}</Badge>
                    <p className="text-sm text-red-700">
                        This order has been cancelled.
                    </p>
                 </div>
            )}


            <Card className="mb-6 shadow-md">
                <CardHeader>
                    <CardTitle>Order Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex justify-between"><span>Order ID:</span> <span className="font-medium">{order.id}</span></div>
                    <div className="flex justify-between"><span>Blood Type:</span> <span className="font-medium text-primary">{order.bloodType}</span></div>
                    <div className="flex justify-between"><span>Requested Amount:</span> <span className="font-medium">{order.amount} unit(s)</span></div>
                    {supplierDetails && (
                         <>
                            <div className="flex justify-between"><span>Supplier:</span> <span className="font-medium">{supplierDetails.hospital}</span></div>
                            <div className="flex justify-between"><span>Supplier Location:</span> <span className="font-medium">{supplierDetails.location}</span></div>
                         </>
                    )}
                    <div className="flex justify-between"><span>Blood Code:</span> <span className="font-medium text-muted-foreground">{order.bloodCode}</span></div>
                    <div className="flex justify-between"><span>Order Date:</span> <span className="font-medium">{formatDate(order.orderDate)}</span></div>
                </CardContent>
            </Card>

            <Card className="mb-6 shadow-md">
                <CardHeader>
                    <CardTitle>Delivery Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex justify-between">
                        <span>Status:</span> 
                        <Badge variant={order.status === 'Ongoing' ? 'default' : order.status === 'Completed' ? 'default' : 'destructive'} 
                               className={
                                order.status === 'Ongoing' ? 'bg-orange-500 text-white hover:bg-orange-600' : 
                                order.status === 'Completed' ? 'bg-green-500 text-white hover:bg-green-600' : ''
                               }>
                            {order.status}
                        </Badge>
                    </div>
                    <div className="flex justify-between"><span>Destination:</span> <span className="font-medium">{order.destination}</span></div>
                </CardContent>
            </Card>

            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex justify-between"><span>Payment Method:</span> <span className="font-medium">{order.paymentMethod}</span></div>
                    <div className="flex justify-between"><span>Total Price:</span> <span className="font-bold text-primary">Rp{order.price.toLocaleString("id-ID")}</span></div>
                </CardContent>
            </Card>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-6 mt-12 border-t text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} Circula. All rights reserved.
      </footer>
    </div>
  );
}
