"use client";

import React, { useState } from "react";

export default function Page() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};

    if (!fullName.trim()) e.fullName = "Full name is required.";

    // simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) e.email = "Email is required.";
    else if (!emailRegex.test(email)) e.email = "Enter a valid email address.";

    if (!password) e.password = "Password is required.";
    else if (password.length < 8) e.password = "Password must be at least 8 characters.";

    if (!confirm) e.confirm = "Please confirm your password.";
    else if (confirm !== password) e.confirm = "Passwords do not match.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    // TODO: submit to backend or call registration API
    console.log("Validated — ready to submit", { fullName, email });
  };

  const inputClass = (field: string) =>
    `mt-1 w-full rounded-lg border px-3 py-2 text-gray-700 focus:outline-none ${
      errors[field] ? "border-red-500 focus:border-red-500" : "focus:border-indigo-500"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-slate-800 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-gray-900 text-center">Join AgriBridge</h1>
        <p className="text-sm text-gray-500 text-center mt-1">Create your account</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <label className="text-sm text-gray-700">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className={inputClass("fullName")}
            />
            {errors.fullName && <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>}
          </div>

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

          <div>
            <label className="text-sm text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              className={inputClass("confirm")}
            />
            {errors.confirm && <p className="text-sm text-red-600 mt-1">{errors.confirm}</p>}
          </div>

          <button
            type="submit"
            className="w-full mt-2 rounded-lg bg-green-600 py-2.5 text-white font-semibold hover:bg-green-700 transition"
          >
            Signup
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account? {" "}
          <a href="/login" className="text-green-600 font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}


