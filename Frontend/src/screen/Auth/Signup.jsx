import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";

const validateEmail = (email) => {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateUsername = (username) => {
    // At least 3 chars, alphanumeric and underscores
    return /^[a-zA-Z0-9_]{3,}$/.test(username);
};

const validatePassword = (password) => {
    // At least 6 chars
    return password.length >= 6;
};

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        terms: false,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Name is required.";
        if (!form.email.trim()) newErrors.email = "Email is required.";
        else if (!validateEmail(form.email)) newErrors.email = "Invalid email address.";
        if (!form.username.trim()) newErrors.username = "Username is required.";
        else if (!validateUsername(form.username)) newErrors.username = "Username must be at least 3 characters and contain only letters, numbers, or underscores.";
        if (!form.password.trim()) newErrors.password = "Password is required.";
        else if (!validatePassword(form.password)) newErrors.password = "Password must be at least 6 characters.";
        if (!form.terms) newErrors.terms = "You must agree to the Terms and Privacy Policy.";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setForm({
                name: "",
                email: "",
                username: "",
                password: "",
                terms: false,
            });
            setLoading(false);
            setErrors({});
            alert("Signup successful!");
        }, 1000);
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
                {/* Social Signup Buttons */}
                <div className="flex flex-col gap-3">
                    <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2"
                    >
                        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/google.svg" alt="Google" className="w-5 h-5" />
                        Sign up with Google
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2"
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
                {/* Signup Form */}
                <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
                    <div>
                        <Input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            aria-invalid={!!errors.name}
                        />
                        {errors.name && (
                            <span className="text-xs text-red-500">{errors.name}</span>
                        )}
                    </div>
                    <div>
                        <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                            <span className="text-xs text-red-500">{errors.email}</span>
                        )}
                    </div>
                    <div>
                        <Input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            aria-invalid={!!errors.username}
                        />
                        {errors.username && (
                            <span className="text-xs text-red-500">{errors.username}</span>
                        )}
                    </div>
                    <div>
                        <Input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            aria-invalid={!!errors.password}
                        />
                        {errors.password && (
                            <span className="text-xs text-red-500">{errors.password}</span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="terms"
                            name="terms"
                            checked={form.terms}
                            onChange={handleChange}
                            className="accent-[#101223] w-4 h-4"
                        />
                        <label htmlFor="terms" className="text-xs text-gray-500">
                            I agree to the Terms and Privacy Policy.
                        </label>
                    </div>
                    {errors.terms && (
                        <span className="text-xs text-red-500">{errors.terms}</span>
                    )}
                    <Button
                        className="w-full bg-[#101223] text-white hover:bg-[#23263a]"
                        disabled={loading}
                        type="submit"
                    >
                        {loading ? <>loading</> : "Continue"}
                    </Button>
                </form>
                {/* Log in Link */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    Have an account?{" "}
                    <a href="#" className="font-semibold text-black hover:underline">
                        Log In
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Signup;