"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SocialIcon } from 'react-social-icons'; // Import SocialIcon

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

// Validation Schema (only email and password)
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type SignUpFormValues = z.infer<typeof formSchema>;

export function SignUpForm() {
  const { toast } = useToast();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignUpFormValues) => {
    try {
      // In a real app, hash the password and call the backend API
      localStorage.setItem("circulaUserData", JSON.stringify(data));

      toast({
        title: "Account Creation Pending",
        description: "Your account creation process has started.",
      });
      // Optionally redirect or clear form
      // form.reset();
      // Consider redirecting: router.push('/dashboard')
    } catch (error) {
      console.error("Failed to process sign up:", error);
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: "Could not process your request. Please try again.",
      });
    }
  };

  const handleSocialSignUp = (provider: string) => {
    // Placeholder for actual social sign-up logic
    console.log(`Signing up with ${provider}`);
    toast({
        title: `Sign up with ${provider}`,
        description: `${provider} sign up is not implemented yet.`,
      });
  }

  return (
    <div className="w-full max-w-md">
        {/* Removed CardHeader, Title/Description moved to page */}
         <h1 className="text-2xl font-bold mb-2">Create your account</h1>
         <p className="text-muted-foreground mb-6">
            To help ensure a steady flow of life-saving blood for those who need it the most
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
                    <Input placeholder="Your email" {...field} />
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
                      {/* Removed password toggle */}
                      <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Button updated */}
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 mt-6">
              Create my account
            </Button>
          </form>
        </Form>

       {/* OR Separator */}
        <div className="flex items-center my-6">
            <Separator className="flex-1" />
            <span className="mx-4 text-xs text-muted-foreground">OR</span>
            <Separator className="flex-1" />
        </div>

        {/* Social Sign Up Buttons */}
        <div className="space-y-3">
             <Button variant="outline" className="w-full h-11 flex items-center justify-center gap-2" onClick={() => handleSocialSignUp('Apple')}>
                <SocialIcon network="apple" style={{ height: 20, width: 20 }} bgColor="currentColor" fgColor="transparent" className="text-foreground" />
                Sign up with Apple
            </Button>
             <Button variant="outline" className="w-full h-11 flex items-center justify-center gap-2" onClick={() => handleSocialSignUp('Google')}>
                <SocialIcon network="google" style={{ height: 20, width: 20 }} />
                Sign up with Google
            </Button>
            <Button variant="outline" className="w-full h-11 flex items-center justify-center gap-2" onClick={() => handleSocialSignUp('X')}>
                <SocialIcon network="x" style={{ height: 20, width: 20 }} bgColor="currentColor" fgColor="transparent" className="text-foreground" />
                Sign up with X
            </Button>
        </div>

      <Toaster />
    </div>
  );
}
