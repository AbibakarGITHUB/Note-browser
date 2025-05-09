"use client"
import React from "react";

export default function LandingPage() {
  return (

    
    <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-6 p-4">
      <h1 className="text-white text-lg font-medium">Welcome to the landing page</h1>
      
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <a 
          href="../login" 
          className="text-white hover:underline text-center"
        >
          Login
        </a>
        <a 
          href="../signup" 
          className="text-white hover:underline text-center"
        >
          Signup
        </a>
     
      </div>
    </div>
  );
}