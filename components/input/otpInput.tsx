import React, { useState, useRef, ChangeEvent, KeyboardEvent } from "react";

// Define the type for the OTP input component props
interface OtpInputProps {
  onVerify: (otp: string) => void; // Callback for OTP verification
}

const OtpInput: React.FC<OtpInputProps> = ({ onVerify }) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]); // OTP array (string)
  const [error, setError] = useState<string>(""); // Error message state
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]); // Reference to input elements
  
  // Handle OTP input changes
  const handleChange = (index: number, value: string): void => {
    if (isNaN(Number(value))) return; // Ensure only numbers are entered
    
    let newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // Update OTP state
    setOtp(newOtp);
    
    // Move to next input field if the current one is filled
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };
  
  // Handle backspace key press for navigation
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputsRef.current[index - 1]?.focus();
    }
  };
  
  // Submit OTP for verification
  const handleSubmit = (): void => {
    const enteredOtp = otp.join(""); // Combine OTP array into a single string
    if (enteredOtp.length !== 6) {
      setError("Please enter a 6-digit OTP.");
      return;
    }
    setError("");
    onVerify(enteredOtp);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
      <h2 className="text-2xl font-semibold mb-4">Enter OTP</h2>
      <div className="flex justify-center gap-2 mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            value={digit}
            maxLength={1}
            className="w-12 h-12 text-xl text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
          />
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Verify OTP
      </button>
    </div>
  );
};

export default OtpInput;
