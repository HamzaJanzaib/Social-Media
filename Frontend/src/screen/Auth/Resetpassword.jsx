import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

// Simple eye/eye-off SVGs
const EyeIcon = ({ open }) => open ? (
  <Eye />
) : (
  <EyeOff />
);

const Resetpassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!password || !confirm) {
      setError("Please fill in both fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setSuccess("Password reset successfully!");
    setPassword("");
    setConfirm("");
  };

  return (
    <div className="min-h-screen bg-[#fcfdff] flex flex-col items-center pt-12">
      {/* Logo and Title */}
      <div className="flex gap-2 items-center mb-8">
        <img src="/Logomark.png" alt="Logomark" className="h-8 w-8" />
        <span className="font-semibold text-lg">Social</span>
      </div>
      {/* Card */}
      <Card className="w-[90%] max-w-sm rounded-xl shadow-none border border-[#f3f4f6]">
        <CardContent className="py-12 px-8 flex flex-col items-center">
          <h2 className="text-lg font-medium mb-8 text-black">Reset Password</h2>
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className=" border border-[#e5e7eb] h-12 text-base pr-10"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                className="border border-[#e5e7eb] h-12 text-base pr-10"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                onClick={() => setShowConfirm(v => !v)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                <EyeIcon open={showConfirm} />
              </button>
            </div>
            {error && (
              <div className="text-red-500 text-sm mt-2">{error}</div>
            )}
            {success && (
              <div className="text-green-600 text-sm mt-2">{success}</div>
            )}
            <Button
              type="submit"
              className="mt-4 h-12 bg-[#0a0c1b] text-white text-base font-medium rounded-lg hover:bg-[#181b2c]"
            >
              Reset password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Resetpassword;