'use client';
import React, { useState } from "react";
import OtpInput from "@/components/input/otpInput";
import Image from "next/image";
import ButtonPrimary from "@/components/button/buttonPrimary";

// Define the state types
interface OtpPageState {
  email: string;
  message: string;
  otpSent: boolean;
}

const OtpPage: React.FC = () => {
  const [email, setEmail] = useState<string>(""); // Email state
  const [message, setMessage] = useState<string>(""); // Message state (success/error)
  const [otpSent, setOtpSent] = useState<boolean>(false); // OTP sent status
  
  // Send OTP to email
  const sendOtp = async (): Promise<void> => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }
    setMessage(""); // Clear previous messages
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/otp/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      setMessage(data.message);
      if (data.success) setOtpSent(true);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };
  
  // Verify OTP
  const verifyOtp = async (otp: string): Promise<void> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_BACKEND_URL}/otp/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    
    const data = await response.json();
    setMessage(data.message);
  };
  
  return (
    <>
      <div className="w-64 mb-8">
        <Image src="/images/logo.svg" alt="Logo" width={100} height={100} className="w-full" />
      </div>
      
      <h2 className="text-2xl font-semibold mb-2">Verify your data</h2>
      <p className="text-gray-500 mb-8">Enter your email address and we&apos;ll send you verify code.</p>
      
      {!otpSent ? (
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Email address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
          <ButtonPrimary
            onClick={sendOtp}
            title="Send OTP"
          />
          {message && <p className="text-center text-gray-600 text-sm">{message}</p>}
        </div>
      ) : (
        <OtpInput onVerify={verifyOtp} />
      )}
    </>
  );
};

export default OtpPage;
