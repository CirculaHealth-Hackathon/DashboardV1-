import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useRouter } from 'next/navigation';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CirculaLogo } from "@/components/icons/circula-logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowLeft } from "lucide-react";


// Validation Schema
const formSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
  bloodType: z.string({
    required_error: "Please select a blood type.",
  }),
  units: z.coerce.number().min(1, { message: "Units must be at least 1." }),
  bloodCode: z.string().min(1, { message: "Blood code is required." }),
});

type InputDataFormValues = z.infer<typeof formSchema>;

export default function InputDataPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [userName, setUserName] = React.useState<string>("Unknown");
  const [userInitial, setUserInitial] = React.useState<string>("?");
  const [isMounted, setIsMounted] = React.useState(false); // State to track mount status


  React.useEffect(() => {
    setIsMounted(true); // Component has mounted
    // Access localStorage only on the client-side
    const userData = localStorage.getItem("circulaUserData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      const email = parsedUserData.email || "Unknown";
      const namePart = email.split('@')[0];
      setUserName(namePart || "Unknown");
      setUserInitial(namePart ? namePart.substring(0, 1).toUpperCase() : "?");
    }
  }, []);


  const form = useForm<InputDataFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // date: new Date(), // Default to today, but allow empty initially
      units: 1,
      bloodCode: "",
    },
  });

  const onSubmit = (data: InputDataFormValues) => {
    // Placeholder for actual data submission logic (e.g., API call)
    console.log("Input data:", data);
    toast({
      title: "Data Submitted",
      description: `Blood Type: ${data.bloodType}, Units: ${data.units}`,
    });
    // Optionally reset the form or navigate away
    // form.reset();
    // router.push('/blood-supply');
  };

   const handleLogout = () => {
    localStorage.removeItem("circulaUserData");
    router.push('/login');
  };

  // Return null or a loader until mounted to prevent hydration issues
  if (!isMounted) {
    return null; // Or replace with a loading spinner/skeleton
  }


  return (
     <div className="min-h-screen bg-background text-foreground">
        {/* Header - Copied from blood-supply page for consistency */}
        <header className="container mx-auto px-4 py-4 flex justify-between items-center border-b">
            <Button variant="ghost" onClick={() => router.push('/blood-supply')}><ArrowLeft /></Button>
            <CirculaLogo className="h-8 w-auto text-primary cursor-pointer" onClick={() => router.push('/blood-supply')} />
            <div className="flex items-center gap-4">
                <Button variant="ghost" className="border" onClick={() => router.push('/blood-supply')}>Database</Button>
                <Button variant="ghost" className="border">My Orders</Button>
                <Button variant="default">Input Data</Button> {/* Highlight current page */}

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
        <main className="container mx-auto px-4 py-12 flex flex-col items-center">
        
        <h1 className="text-3xl font-bold mb-8 text-center">
        <Button variant="ghost" onClick={() => router.push('/blood-supply')}><ArrowLeft /></Button>
        Input Blood Supply Data
        </h1>
        <Card className="w-full max-w-lg shadow-md">
            <CardContent className="p-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Date Field */}
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                            <Button
                                variant={"outline"}
                                className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                                )}
                            >
                                {field.value ? (
                                format(field.value, "yyyy-MM-dd")
                                ) : (
                                <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            />
                        </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                {/* Blood Type Field */}
                <FormField
                    control={form.control}
                    name="bloodType"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Blood Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Select blood type" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                {/* Units Field */}
                <FormField
                    control={form.control}
                    name="units"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Units</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="Enter number of units" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                {/* Blood Code Field */}
                <FormField
                    control={form.control}
                    name="bloodCode"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Blood Code</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter blood code" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                    Submit
                </Button>
                </form>
            </Form>
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

    
