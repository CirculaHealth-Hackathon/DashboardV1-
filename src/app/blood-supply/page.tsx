
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from 'next/image';
import { LOGO_URL } from "@/lib/constants";

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

export default function BloodSupplyPage() {
  const [searchQuery, setSearchQuery] = useState("");
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
    } else {
      // router.push('/login'); // Commented out to prevent premature redirect
    }
  }, []);


  const filteredBloodData = dummyBloodData.filter((data) => {
    const searchStr = `${data.bloodType} ${data.location} ${data.hospital}`.toLowerCase();
    return searchStr.includes(searchQuery.toLowerCase());
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    // The filtering is already happening in real-time due to `filteredBloodData`
    // This function can be used for additional search logic if needed, e.g., API call
    console.log("Search button clicked with query:", searchQuery);
  };


  const handleLogout = () => {
    localStorage.removeItem("circulaUserData");
    router.push('/login');
  };

  if (!isMounted) {
    return null;
  }


  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 flex justify-between items-center border-b">
        <div onClick={() => router.push('/blood-supply')} className="cursor-pointer">
          <Image src={LOGO_URL} alt="Circula Logo" width={156} height={32} priority />
        </div>
        <div className="flex items-center gap-4">
            <Button variant="outline" className="border-border" onClick={() => router.push('/blood-supply')}>Database</Button>
            <Button variant="outline" className="border-border">My Orders</Button>
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Circulating Blood to <span className="text-primary">Those</span> Who{" "}
            <span className="text-primary">Need It Most</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Help ensure a steady flow of life-saving blood for those who need it
          </p>
          <div className="flex justify-center items-center space-x-2 max-w-lg mx-auto">
            <Input
              type="text"
              placeholder="Search for blood type, location, or hospital"
              className="flex-grow"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Button type="button" onClick={handleSearchClick}>
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Blood Supply Data</h2>
          <p className="text-muted-foreground mb-6">
            Current blood supply levels and availability at hospitals and blood
            organizations
          </p>

          <div className="rounded-lg border overflow-hidden shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-semibold">Blood Type</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">
                    Hospital/Organization
                  </TableHead>
                  <TableHead className="font-semibold">Location</TableHead>
                  <TableHead className="font-semibold">Blood Code</TableHead>
                  <TableHead className="font-semibold">Distance</TableHead>
                  <TableHead className="font-semibold text-right">
                    Date Uploaded
                  </TableHead>
                   <TableHead className="font-semibold"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBloodData.map((data, index) => (
                  <TableRow key={index} className="hover:bg-muted/40">
                    <TableCell className="font-medium text-primary">
                      {data.bloodType}
                    </TableCell>
                    <TableCell>{data.amount}</TableCell>
                    <TableCell>{data.hospital}</TableCell>
                    <TableCell>{data.location}</TableCell>
                    <TableCell className="text-muted-foreground">{data.bloodCode}</TableCell>
                    <TableCell>{data.distance}</TableCell>
                    <TableCell className="text-right text-muted-foreground text-sm">
                      {data.dateUploaded}
                    </TableCell>
                     <TableCell className="text-right">
                      <Link href={`/blood-supply/${data.bloodCode}`} passHref>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
                 {filteredBloodData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                      No blood supply data found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-6 mt-12 border-t text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} Circula. All rights reserved.
      </footer>
    </div>
  );
}
