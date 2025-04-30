"use client";

import React, { useState, useEffect } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { CirculaLogo } from "@/components/icons/circula-logo";

export default function LoginPage() {
  const [bloodCells, setBloodCells] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Indicate component has mounted

    // Generate blood cell data client-side
    const generateBloodCells = () => {
      const newCells = Array.from({ length: 20 }, (_, i) => ({
        key: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 5 + 5}s`,
        opacity: Math.random() * 0.6 + 0.4,
      }));
      setBloodCells(newCells);
    };

    generateBloodCells();
  }, []);

  if (!isMounted) {
    // Prevent rendering animation on server or during initial hydration mismatch
    return null;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4 lg:p-8">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-lg shadow-lg bg-card">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <CirculaLogo className="h-8 w-auto text-primary" />
          </div>
          <LoginForm />
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
            {bloodCells.map((cell) => (
              <div
                key={cell.key}
                className="blood-cell"
                style={{
                  top: cell.top,
                  left: cell.left,
                  animationDelay: cell.animationDelay,
                  animationDuration: cell.animationDuration,
                  opacity: cell.opacity,
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
