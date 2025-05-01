
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SocialIcon } from 'react-social-icons';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { Eye, EyeOff } from 'lucide-react'; // Import icons

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";

// Validation Schema
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }), // Basic check
});

type LoginFormValues = z.infer<typeof formSchema>;

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false); // State for password visibility

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    try {
      // Placeholder for actual login logic (e.g., API call)
      console.log("Login data:", data);

      // Example: Check if stored data exists and matches
      const storedData = localStorage.getItem("circulaUserData");
      if (storedData) {
        const userData = JSON.parse(storedData);
        // Convert both stored and input email/password to lowercase for comparison
        if (userData.email.toLowerCase() === data.email.toLowerCase() &&
            userData.password === data.password) { // Compare plain password
            toast({
                title: "Login Successful",
                description: "Welcome back!",
            });
            // Redirect to blood supply page after successful login
            router.push('/blood-supply');
        } else {
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: "Invalid email or password.",
            });
        }
      } else {
         toast({
            variant: "destructive",
            title: "Login Failed",
            description: "No account found with this email.",
        });
      }

    } catch (error) {
      console.error("Failed to process login:", error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Could not process your request. Please try again.",
      });
    }
  };

 const handleSocialLogin = (provider: string) => {
    // Placeholder for actual social login logic
    console.log(`Logging in with ${provider}`);
    toast({
        title: `Log in with ${provider}`,
        description: `${provider} login is not implemented yet.`,
      });
    // Example redirect after social login attempt
    // router.push('/blood-supply');
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md">
         <h1 className="text-2xl font-bold mb-2">Welcome back to Circula</h1>
         <p className="text-muted-foreground mb-6">
            Log in to continue your journey.
         </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                    <div className="flex justify-between items-center">
                        <FormLabel>Password</FormLabel>
                        <Link href="/forgot-password" // Add link to forgot password page
                            className="text-sm text-primary hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                  <FormControl>
                     <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                        />
                         <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                            onClick={togglePasswordVisibility}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                     </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 mt-6">
              Log in
            </Button>
            {/* Link back to Sign Up */}
            <div className="text-center mt-4 text-sm">
                Don't have an account?{' '}
                <Link href="/signup" className="text-primary hover:underline">
                    Sign up
                </Link>
            </div>
          </form>
        </Form>

       {/* OR Separator */}
        <div className="flex items-center my-6">
            <Separator className="flex-1" />
            <span className="mx-4 text-xs text-muted-foreground">OR</span>
            <Separator className="flex-1" />
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
             <Button variant="outline" className="w-full h-11 flex items-center justify-center gap-2" onClick={() => handleSocialLogin('Google')}>
                <SocialIcon network="google" style={{ height: 20, width: 20 }} />
                Log in with Google
            </Button>
            <Button variant="outline" className="w-full h-11 flex items-center justify-center gap-2" onClick={() => handleSocialLogin('X')}>
                <SocialIcon network="x" style={{ height: 20, width: 20 }} bgColor="currentColor" fgColor="transparent" className="text-foreground" />
                Log in with X
            </Button>
        </div>

      <Toaster />
    </div>
  );
}
