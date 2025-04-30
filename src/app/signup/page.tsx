"use client";

import { SignUpForm } from "@/components/auth/signup-form";
import { CirculaLogo } from "@/components/icons/circula-logo";
import React from "react";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4 lg:p-8">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-lg shadow-lg bg-card">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <CirculaLogo className="h-8 w-auto text-primary" />
          </div>
          <SignUpForm />
        </div>

        {/* Blood Cell Stream Animation Section */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"
            style={{ zIndex: 1 }}
          />
          <div
            className="blood-cell-container absolute inset-0"
            style={{ zIndex: 0 }}
          >
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="blood-cell"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 5 + 5}s`,
                  opacity: Math.random() * 0.6 + 0.4,
                }}
              />
            ))}
          </div>
          <div className="absolute bottom-10 left-10 text-white p-4" style={{ zIndex: 2 }}>
            <h2 className="text-3xl font-semibold leading-tight">
              Circulating blood to <span className="text-primary">those</span> who{" "}
              <span className="text-primary">need it the most</span>
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
}
