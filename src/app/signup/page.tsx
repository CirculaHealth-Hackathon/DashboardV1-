
"use client";

import React, { useState, useEffect } from "react";
import { SignUpForm } from "@/components/auth/signup-form";
import Image from "next/image";
import { LOGO_URL } from "@/lib/constants";

const RIGHT_PANEL_IMAGE_URL = "https://firebasestorage.googleapis.com/v0/b/fbtools-internal-prod.appspot.com/o/static%2Fmaker-images%2F09228060-b17b-4046-ad74-95a0c940d1d3?alt=media&token=7c478c55-3469-4898-9a33-7316456111a6";


export default function SignUpPage() {
  const [bloodCells, setBloodCells] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

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

    if (typeof window !== 'undefined') {
        generateBloodCells();
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4 lg:p-8">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-lg shadow-lg bg-card">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <Image src={LOGO_URL} alt="Circula Logo" width={156} height={32} priority />
          </div>
          <SignUpForm />
        </div>

        {/* Image and Animation Section */}
        <div className="hidden lg:block lg:w-1/2 relative">
           {isMounted && (
            <div className="blood-cell-container absolute inset-0" style={{ zIndex: 0 }}>
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
          )}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"
            style={{ zIndex: 1 }}
          />
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
