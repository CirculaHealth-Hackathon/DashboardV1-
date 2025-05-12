
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Order } from "../confirm-order/page"; // Assuming Order type might be useful for header consistency

const paymentMethods = [
  { value: "My Wallet", label: "My Wallet" },
  { value: "QRIS", label: "QRIS" },
  { value: "E-Wallet", label: "E-Wallet (Gopay, ShopeePay, OVO)" },
  { value: "Virtual Account", label: "Virtual Account (BCA, Mandiri)" },
  { value: "IDRX", label: "IDRX" },
];

export default function DepositFundsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [userName, setUserName] = useState<string>("Unknown");
  const [userInitial, setUserInitial] = useState<string>("?");
  const [isMounted, setIsMounted] = useState(false);
  const [ongoingOrdersCount, setOngoingOrdersCount] = useState(0);
  const [amount, setAmount] = useState<string>("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | undefined>(undefined);

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

  const handleDeposit = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: "Please enter a valid amount to deposit.",
      });
      return;
    }
    if (!selectedPaymentMethod) {
      toast({
        variant: "destructive",
        title: "Payment Method Required",
        description: "Please select a payment method.",
      });
      return;
    }
    // Placeholder for actual deposit logic
    console.log("Depositing:", amount, "using", selectedPaymentMethod);
    toast({
      title: "Deposit Initiated",
      description: `Rp${parseFloat(amount).toLocaleString("id-ID")} deposit using ${selectedPaymentMethod} is being processed.`,
    });
    // Potentially redirect or update wallet balance here
    // For now, just clear form and stay on page
    setAmount("");
    setSelectedPaymentMethod(undefined);
  };

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

      <main className="container mx-auto px-4 py-12 flex flex-col items-center">
        <div className="w-full max-w-md">
            <div className="flex items-center mb-6">
                <Button variant="ghost" onClick={() => router.push('/my-wallet')} className="mr-2">
                    <ArrowLeft />
                </Button>
                <h1 className="text-2xl font-bold">Deposit Funds</h1>
            </div>
            <p className="text-muted-foreground mb-8 text-center">Add funds to your wallet to use for blood requests.</p>

            <Card className="shadow-md">
                <CardContent className="p-6 space-y-6">
                    <div>
                        <Label htmlFor="amount" className="mb-2 block">Amount</Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="h-11"
                        />
                    </div>
                    <div>
                        <Label htmlFor="paymentMethod" className="mb-2 block">Payment Method</Label>
                        <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                            <SelectTrigger className="h-11">
                                <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            <SelectContent>
                                {paymentMethods.map(method => (
                                    <SelectItem key={method.value} value={method.value}>
                                        {method.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button
                        className="w-full bg-[#FF8C00] hover:bg-[#FFA500] text-white h-11"
                        onClick={handleDeposit}
                        disabled={!amount || !selectedPaymentMethod}
                    >
                        Deposit
                    </Button>
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
