
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft, X } from "lucide-react"; 
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; 
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import * as React from "react";
import Image from 'next/image'; // Import Image component

const LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/fbtools-internal-prod.appspot.com/o/static%2Fmaker-images%2F08417035-a55b-4993-829d-35641b92c9ce?alt=media&token=610e2d18-69c7-47d4-a1b8-c068077314f4";


// Dummy data for blood supply details
const dummyBloodData = [
  {
    bloodType: "A+",
    amount: "100 Unit",
    hospital: "Rumah Sakit Hermina",
    location: "Yogyakarta",
    bloodCode: "XXX0121",
    distance: "6 km",
    dateUploaded: "Jan 10, 2025 10:10 WIB",
    whatsapp: "+62812-3456-7890",
    phone: "+62274-987654",
    email: "info@rshermina.co.id",
  },
  {
    bloodType: "A-",
    amount: "50 Unit",
    hospital: "Palang Merah Indonesia",
    location: "Jakarta",
    bloodCode: "XXX0122",
    distance: "10 km",
    dateUploaded: "Jan 10, 2025 09:45 WIB",
    whatsapp: "+62812-3456-7891",
    phone: "+62274-987655",
    email: "info@pmi.or.id",
  },
  {
    bloodType: "B+",
    amount: "75 Unit",
    hospital: "Palang Merah Indonesia",
    location: "Bandung",
    bloodCode: "XXX0123",
    distance: "25 km",
    dateUploaded: "Jan 09, 2025 15:30 WIB",
    whatsapp: "+62812-3456-7892",
    phone: "+62274-987656",
    email: "info@pmi.or.id",
  },
  {
    bloodType: "O+",
    amount: "120 Unit",
    hospital: "RSUP Dr. Sardjito",
    location: "Yogyakarta",
    bloodCode: "XXX0124",
    distance: "25 km",
    dateUploaded: "Jan 09, 2025 11:00 WIB",
    whatsapp: "+62812-3456-7893",
    phone: "+62274-987657",
    email: "info@sardjito.co.id",
  },
  {
    bloodType: "O-",
    amount: "30 Unit",
    hospital: "Rumah Sakit Hermina",
    location: "Yogyakarta",
    bloodCode: "XXX0125",
    distance: "32 km",
    dateUploaded: "Jan 08, 2025 16:20 WIB",
    whatsapp: "+62812-3456-7894",
    phone: "+62274-987658",
    email: "info@rshermina.co.id",
  },
   {
    bloodType: "AB+",
    amount: "40 Unit",
    hospital: "RS Pondok Indah",
    location: "Jakarta",
    bloodCode: "XXX0126",
    distance: "15 km",
    dateUploaded: "Jan 10, 2025 11:15 WIB",
    whatsapp: "+62812-3456-7895",
    phone: "+62274-987659",
    email: "info@rspondokindah.co.id",
  },
  {
    bloodType: "B-",
    amount: "20 Unit",
    hospital: "RS Borromeus",
    location: "Bandung",
    bloodCode: "XXX0127",
    distance: "28 km",
    dateUploaded: "Jan 09, 2025 10:05 WIB",
     whatsapp: "+62812-3456-7896",
    phone: "+62274-987660",
    email: "info@rsborromeus.co.id",
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
  whatsapp: string;
  phone: string;
  email: string;
}

interface Props {
  params: { bloodCode: string };
}

export default function BloodSupplyDetailsPage({ params }: Props) {
  const bloodCode = React.use(React.useMemo(() => Promise.resolve(params.bloodCode), [params.bloodCode]));
  const [bloodData, setBloodData] = useState<BloodData | undefined>(undefined);
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
  }, [bloodCode]);

  const handleLogout = () => {
    localStorage.removeItem("circulaUserData");
    router.push('/login');
  };

  if (!isMounted) {
    return null;
  }

  if (!bloodData) {
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
        <main className="container mx-auto px-4 py-8">
          <p>Blood supply data not found.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-center flex items-center">
            <Button variant="ghost" onClick={() => router.push('/blood-supply')} className="mr-2">
                <ArrowLeft />
            </Button>
            Blood Supply Details
        </h1>

      <Card className="w-full max-w-lg shadow-md">
            <CardContent className="p-6">
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Blood Type:</span>
                        <span>{bloodData.bloodType}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Amount:</span>
                        <span>{bloodData.amount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Hospital/Organization:</span>
                        <span>{bloodData.hospital}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Location:</span>
                        <span>{bloodData.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Distance:</span>
                        <span>{bloodData.distance}</span>
                    </div>
                     <div className="flex items-center justify-between">
                        <span className="font-semibold">Date Uploaded:</span>
                        <span>{bloodData.dateUploaded}</span>
                    </div>
                </section>

                <section className="mt-8 flex justify-start gap-4">
                   <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Contact Hospital</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Contact Hospital</DialogTitle>
                                <DialogDescription>
                                    Here are the contact details for {bloodData.hospital}.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="whatsapp" className="text-right">
                                        WhatsApp
                                    </label>
                                    <Input type="text" id="whatsapp" value={bloodData.whatsapp} className="col-span-3" readOnly />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="phone" className="text-right">
                                        Phone
                                    </label>
                                    <Input type="text" id="phone" value={bloodData.phone} className="col-span-3" readOnly />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="email" className="text-right">
                                        Email
                                    </label>
                                    <Input type="email" id="email" value={bloodData.email} className="col-span-3" readOnly />
                                </div>
                            </div>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">Close</Button>
                            </DialogClose>
                        </DialogContent>
                    </Dialog>
                    <Link href={`/blood-request-confirmation/${bloodData.bloodCode}`} passHref>
                         <Button>Request Blood Through Circula</Button>
                    </Link>
                </section>
            </CardContent>
        </Card>
      </main>

      <footer className="container mx-auto px-4 py-6 mt-12 border-t text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} Circula. All rights reserved.
      </footer>
    </div>
  );
}
