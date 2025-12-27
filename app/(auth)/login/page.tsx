"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const e: Record<string, string> = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) e.email = "Email is required.";
        else if (!emailRegex.test(email)) e.email = "Enter a valid email address.";

        if (!password) e.password = "Password is required.";

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();
        if (!validate()) return;
        // TODO: call login API; for now navigate to dashboard
        router.push("/dashboard");
    };

    const inputClass = (field: string) =>
        `mt-1 w-full rounded-lg border px-3 py-2 text-gray-700 focus:outline-none ${
            errors[field] ? "border-red-500 focus:border-red-500" : "focus:border-indigo-500"
        }`;

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-slate-800 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl">
                <h1 className="text-3xl font-bold text-gray-900 text-center">AgriBridge</h1>
                <p className="text-sm text-gray-500 text-center mt-1">Sign in to your account</p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                    <div>
                        <label className="text-sm text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@email.com"
                            className={inputClass("email")}
                        />
                        {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="text-sm text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className={inputClass("password")}
                        />
                        {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-2 rounded-lg bg-green-600 py-2.5 text-white font-semibold hover:bg-green-700 transition"
                    >
                        Login
                    </button>

                </form>

                <p className="text-sm text-center text-gray-600 mt-6">
                    Don’t have an account? {" "}
                    <Link href="/signup" className="text-green-600 font-medium">Sign up</Link>
                </p>
            </div>
        </div>
    );
}

