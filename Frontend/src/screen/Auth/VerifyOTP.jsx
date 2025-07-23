import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const OTP_LENGTH = 4;
const RESEND_TIME = 45;

const VerifyOTP = () => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [activeInput, setActiveInput] = useState(0);
  const [timer, setTimer] = useState(RESEND_TIME);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    inputRefs.current[activeInput]?.focus();
  }, [activeInput]);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) return;
    const newOtp = [...otp];
    newOtp[idx] = val[0];
    setOtp(newOtp);
    setError("");
    if (idx < OTP_LENGTH - 1) setActiveInput(idx + 1);
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (otp[idx]) {
        const newOtp = [...otp];
        newOtp[idx] = "";
        setOtp(newOtp);
      } else if (idx > 0) {
        setActiveInput(idx - 1);
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    if (paste.length === OTP_LENGTH) {
      setOtp(paste.split(""));
      setActiveInput(OTP_LENGTH - 1);
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (otp.some((d) => d === "")) {
      setError("Please enter the complete code.");
      return;
    }
    // Add your verification logic here
    setError("");
    alert("OTP Verified: " + otp.join(""));
  };

  const handleResend = () => {
    setTimer(RESEND_TIME);
    setOtp(Array(OTP_LENGTH).fill(""));
    setActiveInput(0);
    // Add resend logic here
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFBFF]">
      <div className="flex gap-2 items-center mb-8">
        <img src="/Logomark.png" alt="Logomark" className="h-8 w-8" />
        <span className="font-semibold text-lg">Social</span>
      </div>
      <Card className="w-[90%] max-w-sm shadow-none border border-gray-100">
        <CardContent className="py-10 flex flex-col items-center">
          <h2 className="text-lg font-medium mb-2">Enter verification code</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Code sent to <span className="font-medium">anorouzi.work@gmail.com</span>
          </p>
          <form onSubmit={handleVerify} className="w-full flex flex-col items-center">
            <div className="flex gap-4 mb-4">
              {otp.map((digit, idx) => (
                <Input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onFocus={() => setActiveInput(idx)}
                  onPaste={handlePaste}
                  className={cn(
                    "w-12 h-12 text-center text-xl font-semibold border-2 rounded-md transition-colors",
                    digit
                      ? "border-primary"
                      : "border-gray-200 focus:border-primary"
                  )}
                  autoFocus={idx === 0}
                />
              ))}
            </div>
            {error && (
              <div className="text-red-500 text-xs mb-2">{error}</div>
            )}
            <div className="mb-6 text-sm text-muted-foreground">
              Resend in{" "}
              <span className="font-semibold">
                {timer > 0
                  ? `0:${timer.toString().padStart(2, "0")}`
                  : (
                    <button
                      type="button"
                      className="text-primary underline"
                      onClick={handleResend}
                    >
                      Resend
                    </button>
                  )}
              </span>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#0F172A] text-white text-base font-semibold rounded-md py-6"
              disabled={otp.some((d) => d === "")}
            >
              Verify
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOTP;