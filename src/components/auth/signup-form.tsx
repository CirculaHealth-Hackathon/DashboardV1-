"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Keep imports for styling
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

// Validation Schema
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
});

type SignUpFormValues = z.infer<typeof formSchema>;

export function SignUpForm() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignUpFormValues) => {
    try {
      // In a real app, hash the password before storing
      const { confirmPassword, ...userData } = data; // Don't store confirmPassword
      localStorage.setItem("formifyUserData", JSON.stringify(userData));

      toast({
        title: "Sign Up Successful!",
        description: "Your account has been created.",
      });
      // Optionally redirect or clear form
       form.reset();
      // Consider redirecting: router.push('/login') or router.push('/dashboard')
    } catch (error) {
      console.error("Failed to save user data:", error);
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: "Could not save your details. Please try again.",
      });
    }
  };

  return (
    // Removed the outer Card component, styles applied via Card* components remain
    <div className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center p-0 mb-6"> {/* Adjust padding/margin as needed */}
        <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
        <CardDescription>Enter your email and password to sign up</CardDescription>
      </CardHeader>
      <CardContent className="p-0"> {/* Adjust padding as needed */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@example.com" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                      <div className="relative">
                          <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="********"
                              {...field}
                          />
                          <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                              onClick={() => setShowPassword(!showPassword)}
                              aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                              {showPassword ? <EyeOff /> : <Eye />}
                          </Button>
                      </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                   <FormControl>
                      <div className="relative">
                          <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="********"
                              {...field}
                          />
                          <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                          >
                              {showConfirmPassword ? <EyeOff /> : <Eye />}
                          </Button>
                      </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Sign Up</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center p-0 mt-6"> {/* Adjust padding/margin as needed */}
         <p className="text-sm text-muted-foreground">
          {/* Add link to login page if needed */}
          {/* Already have an account? <a href="/login" className="text-primary hover:underline">Login</a> */}
        </p>
      </CardFooter>
      <Toaster />
    </div>
  );
}
