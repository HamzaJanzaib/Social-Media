import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const errs = {};
        if (!form.email) {
            errs.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            errs.email = "Email is invalid";
        }
        if (!form.password) {
            errs.password = "Password is required";
        }
        return errs;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: undefined });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setLoading(true);
        try {
            // Replace with your submit logic
            await new Promise((res) => setTimeout(res, 1500));
            // Reset form or redirect on success
        } catch (err) {
            // Handle error
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafbff]">
            {/* Logo and Title */}
            <div className="flex flex-col items-center mb-8">
                <span className="text-2xl items-center flex gap-2 font-bold mb-2">
                    <img src="/Logomark.png" alt="Logomark" className="w-8 h-8" />
                    Social
                </span>
            </div>
            {/* Card */}
            <div className="bg-white rounded-sm shadow-md px-8 py-10 w-[90%] max-w-sm">
                {/* Social Login Buttons */}
                <div className="flex flex-col gap-3">
                    <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2"
                        disabled={loading}
                    >
                        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/google.svg" alt="Google" className="w-5 h-5" />
                        Log in with Google
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2"
                        disabled={loading}
                    >
                        <Mail className="text-lg" />
                        Log in with Email
                    </Button>
                </div>
                {/* Separator */}
                <div className="flex items-center my-6">
                    <Separator className="flex-1" />
                    <span className="mx-4 text-gray-400 text-sm">OR</span>
                    <Separator className="flex-1" />
                </div>
                {/* Email/Password Form */}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
                    <div>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            disabled={loading}
                            aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                            <span className="text-xs text-red-500">{errors.email}</span>
                        )}
                    </div>
                    <div>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            disabled={loading}
                            aria-invalid={!!errors.password}
                        />
                        {errors.password && (
                            <span className="text-xs text-red-500">{errors.password}</span>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <a
                            href="#"
                            className="text-xs text-gray-500 hover:underline"
                        >
                            Forgot Password?
                        </a>
                    </div>
                    <Button
                        className="w-full bg-[#101223] text-white hover:bg-[#23263a]"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Log in"}
                    </Button>
                </form>
                {/* Sign up Link */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    Don&apos;t have an account?{" "}
                    <a href="#" className="font-semibold text-black hover:underline">
                        Sign up
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;