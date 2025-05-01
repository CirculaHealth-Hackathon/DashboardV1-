"use client";

import { Button } from "@/components/ui/button";
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
import { CirculaLogo } from "@/components/icons/circula-logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft } from "lucide-react"; // Import ArrowLeft icon
import Link from "next/link";

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
  const { bloodCode } = params;
  const [bloodData, setBloodData] = useState<BloodData | undefined>(undefined);
  const router = useRouter();
  const [userName, setUserName] = useState<string>("Unknown");
  const [userInitial, setUserInitial] = useState<string>("?");
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true);
    // Access localStorage only on the client-side
    const userData = localStorage.getItem("circulaUserData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      const email = parsedUserData.email || "Unknown";
      const namePart = email.split('@')[0];
      setUserName(namePart || "Unknown");
      setUserInitial(namePart ? namePart.substring(0, 1).toUpperCase() : "?");
    }

    // Find the selected blood data based on bloodCode
    const selectedData = dummyBloodData.find((data) => data.bloodCode === bloodCode);
    setBloodData(selectedData);
  }, [bloodCode, router]);

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
          <CirculaLogo className="h-8 w-auto text-primary" />
          {/* Profile Dropdown */}
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  {/* Changed trigger to just the Avatar */}
                  <Avatar className="cursor-pointer">
                      <AvatarImage data-ai-hint="user avatar" src={`https://picsum.photos/seed/${userName}/50/50`} alt={userName} />
                      <AvatarFallback>{userInitial}</AvatarFallback>
                  </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
              <DropdownMenuItem>
                  {/* User info in the menu */}
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
        <CirculaLogo className="h-8 w-auto text-primary" />
          {/* Profile Dropdown */}
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  {/* Changed trigger to just the Avatar */}
                  <Avatar className="cursor-pointer">
                      <AvatarImage data-ai-hint="user avatar" src={`https://picsum.photos/seed/${userName}/50/50`} alt={userName} />
                      <AvatarFallback>{userInitial}</AvatarFallback>
                  </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
              <DropdownMenuItem>
                  {/* User info in the menu */}
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
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <Link href="/blood-supply" className="inline-flex items-center mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blood Supply Data
          </Link>

          <h1 className="text-4xl font-bold mb-4">Blood Supply Details</h1>
          <p className="text-muted-foreground">
            Details for blood code: {bloodCode}
          </p>
        </section>

        <section className="grid gap-4">
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
        </section>

        <section className="mt-8 flex justify-start gap-4">
          <Button variant="outline">Contact Hospital</Button>
          <Button>Request Blood Through Circula</Button>
        </section>
      </main>

      {/* Footer Placeholder */}
      <footer className="container mx-auto px-4 py-6 mt-12 border-t text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} Circula. All rights reserved.
      </footer>
    </div>
  );
}
