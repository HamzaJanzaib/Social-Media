import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    // Add email validation if needed
    setSuccess("Reset link sent to your email!");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-[#fcfdff] flex flex-col items-center justify-center">
       {/* Logo and Title */}
      <div className="flex gap-2 items-center mb-8">
        <img src="/Logomark.png" alt="Logomark" className="h-8 w-8" />
        <span className="font-semibold text-lg">Social</span>
      </div>
      <Card className="w-[90%] max-w-sm rounded-2xl shadow-sm border border-[#f3f4f6] bg-white">
        <CardContent className="py-10 px-8 flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2 text-black text-center">
            Forgot password
          </h2>
          <p className="text-sm text-[#6b7280] mb-8 text-center">
            Enter your email to reset your password<br />and access your account.
          </p>
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border border-[#e5e7eb] h-12 text-base"
            />
            {error && (
              <div className="text-red-500 text-sm mt-1">{error}</div>
            )}
            {success && (
              <div className="text-green-600 text-sm mt-1">{success}</div>
            )}
            <Button
              type="submit"
              className="mt-2 h-12 bg-[#0a0c1b] text-white text-base font-medium rounded-lg hover:bg-[#181b2c]"
            >
              Send reset link
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
