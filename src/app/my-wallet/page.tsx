
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LOGO_URL } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { Order } from "../confirm-order/page";

interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
}

const dummyTransactions: Transaction[] = [
  { id: "1", date: new Date(2024, 3, 14), description: "Payment for blood request", amount: 600000 },
  { id: "2", date: new Date(2024, 3, 12), description: "Payment for database access", amount: 1200000 },
  { id: "3", date: new Date(2024, 3, 10), description: "Top-up from BCA Virtual Account", amount: -2000000 }, // Negative for top-up
  { id: "4", date: new Date(2024, 3, 8), description: "Payment for blood request", amount: 550000 },
];

export default function MyWalletPage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("Unknown");
  const [userInitial, setUserInitial] = useState<string>("?");
  const [isMounted, setIsMounted] = useState(false);
  const [balance, setBalance] = useState<number>(25700000);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
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

    const storedOrdersString = localStorage.getItem("circulaUserOrders");
    if (storedOrdersString) {
      const orders: Order[] = JSON.parse(storedOrdersString);
      setOngoingOrdersCount(orders.filter(order => order.status === 'Ongoing').length);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("circulaUserData");
    router.push('/login');
  };

  const filteredTransactions = dummyTransactions.filter(transaction => {
    const transactionDate = transaction.date;
    if (startDate && transactionDate < startDate) return false;
    if (endDate && transactionDate > new Date(endDate.getTime() + 24 * 60 * 60 * 1000 -1) ) return false; // include end date
    return true;
  });

  if (!isMounted) {
    return null;
  }

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
        <div className="flex items-center mb-8">
            <Button variant="ghost" onClick={() => router.push('/blood-supply')} className="mr-2">
                <ArrowLeft />
            </Button>
            <h1 className="text-3xl font-bold">My Wallet</h1>
        </div>

        <Card className="mb-8 shadow-md">
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                    <p className="text-muted-foreground text-sm">Current Balance</p>
                    <p className="text-3xl font-bold text-primary">Rp{balance.toLocaleString("id-ID")}</p>
                </div>
                <Button className="bg-[#FF8C00] hover:bg-[#FFA500] text-white">Deposit Funds</Button>
            </CardContent>
        </Card>

        <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
           <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Start date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>End date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                disabled={(date) =>
                  startDate ? date < startDate : false
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="rounded-lg border overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead>Date</TableHead>
                <TableHead>Transaction</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-muted/40">
                    <TableCell>{format(transaction.date, "MMM d, yyyy")}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className={`text-right font-medium ${transaction.amount < 0 ? 'text-green-600' : 'text-destructive'}`}>
                      {transaction.amount < 0 ? '+' : ''}Rp{Math.abs(transaction.amount).toLocaleString("id-ID")}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-12 text-muted-foreground">
                    No transactions found for the selected period.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-6 mt-12 border-t text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} Circula. All rights reserved.
      </footer>
    </div>
  );
}
