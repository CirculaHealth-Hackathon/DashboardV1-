
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, Truck, Filter, ArrowLeft } from "lucide-react";
import type { Order } from "../confirm-order/page"; // Import Order interface

export default function MyOrdersPage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("Unknown");
  const [userInitial, setUserInitial] = useState<string>("?");
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"All" | "Ongoing" | "Past">("Ongoing");
  const [orders, setOrders] = useState<Order[]>([]);

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
      setOrders(JSON.parse(storedOrdersString));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("circulaUserData");
    router.push('/login');
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === "All") return true;
    if (activeTab === "Ongoing") return order.status === "Ongoing";
    if (activeTab === "Past") return order.status === "Completed" || order.status === "Cancelled";
    return true;
  }).sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()); // Sort by most recent

  const ongoingOrdersCount = orders.filter(order => order.status === 'Ongoing').length;
  const latestOngoingOrder = ongoingOrdersCount > 0 ? filteredOrders.find(o => o.status === 'Ongoing') : null;

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
            <Button variant="default" onClick={() => router.push('/my-orders')}>
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

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
             <Button variant="ghost" onClick={() => router.push('/blood-supply')} className="mr-4">
                <ArrowLeft />
            </Button>
            <h1 className="text-3xl font-bold">My Orders</h1>
        </div>
        
        <p className="text-muted-foreground mb-6">
          You are currently tracking {ongoingOrdersCount} blood-supply request{ongoingOrdersCount === 1 ? '' : 's'}.
        </p>

        {latestOngoingOrder && (
          <div className="bg-primary/10 border border-primary/30 text-primary-foreground p-4 rounded-lg mb-6 flex items-start gap-3 shadow-sm">
            <Truck className="h-6 w-6 text-primary mt-1" />
            <div>
              <p className="font-semibold text-foreground">Delivery to {latestOngoingOrder.destination} in progress.</p>
              <p className="text-sm text-muted-foreground">We will send a confirmation when your order is complete.</p>
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "All" | "Ongoing" | "Past")} className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="Ongoing">Ongoing</TabsTrigger>
              <TabsTrigger value="Past">Past</TabsTrigger>
            </TabsList>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </Tabs>

        <div className="rounded-lg border overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead>Blood Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Hospital/Organization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium text-primary">{order.bloodType}</TableCell>
                    <TableCell>{order.amount} unit</TableCell>
                    <TableCell>{order.hospital}</TableCell>
                    <TableCell>
                      <Badge variant={order.status === 'Ongoing' ? 'default' : 'secondary'}
                       className={order.status === 'Ongoing' ? 'bg-orange-500 text-white hover:bg-orange-600' : ''}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.destination}</TableCell>
                    <TableCell className="text-right">Rp{order.price.toLocaleString("id-ID")}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    {activeTab === "Past" ? (
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <ClipboardCheck className="h-16 w-16 mb-4" />
                        <p className="text-lg font-medium">You have not tracked any past orders</p>
                      </div>
                    ) : (
                      <p>No orders found for this category.</p>
                    )}
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
