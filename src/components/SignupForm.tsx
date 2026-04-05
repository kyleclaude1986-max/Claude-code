"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value.trim(),
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      street: (form.elements.namedItem("street") as HTMLInputElement).value.trim(),
      city: (form.elements.namedItem("city") as HTMLInputElement).value.trim(),
      state: (form.elements.namedItem("state") as HTMLInputElement).value.trim(),
      zip: (form.elements.namedItem("zip") as HTMLInputElement).value.trim(),
    };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      router.push("/thank-you");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="mb-1">
          <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">
            First Name
          </label>
          <input
            name="firstName"
            type="text"
            placeholder="John"
            required
            className="w-full px-4 py-3.5 text-base border-[1.5px] border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 transition-all"
          />
        </div>
        <div className="mb-1">
          <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">
            Last Name
          </label>
          <input
            name="lastName"
            type="text"
            placeholder="Smith"
            required
            className="w-full px-4 py-3.5 text-base border-[1.5px] border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 transition-all"
          />
        </div>
      </div>

      <div className="mb-5 mt-4">
        <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">
          Cell Phone Number
        </label>
        <input
          name="phone"
          type="tel"
          placeholder="(555) 123-4567"
          required
          className="w-full px-4 py-3.5 text-base border-[1.5px] border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 transition-all"
        />
        <p className="text-xs text-gray-400 mt-1">
          We&apos;ll send tile picks to this number via text message.
        </p>
      </div>

      <div className="mb-5">
        <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">
          Email
        </label>
        <input
          name="email"
          type="email"
          placeholder="john@example.com"
          required
          className="w-full px-4 py-3.5 text-base border-[1.5px] border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 transition-all"
        />
      </div>

      <div className="mb-5">
        <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">
          Street Address
        </label>
        <input
          name="street"
          type="text"
          placeholder="123 Main St"
          required
          className="w-full px-4 py-3.5 text-base border-[1.5px] border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_100px] gap-4 mb-5">
        <div>
          <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">
            City
          </label>
          <input
            name="city"
            type="text"
            placeholder="Dallas"
            required
            className="w-full px-4 py-3.5 text-base border-[1.5px] border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 transition-all"
          />
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">
            State
          </label>
          <input
            name="state"
            type="text"
            placeholder="TX"
            required
            className="w-full px-4 py-3.5 text-base border-[1.5px] border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 transition-all"
          />
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">
            ZIP
          </label>
          <input
            name="zip"
            type="text"
            placeholder="75201"
            required
            className="w-full px-4 py-3.5 text-base border-[1.5px] border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 text-[17px] font-semibold bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed mt-2 cursor-pointer"
      >
        {loading ? "Signing you up..." : "Sign Me Up"}
      </button>

      <p className="text-center mt-4 text-[13px] text-gray-400">
        By signing up, you agree to receive text messages. Msg &amp; data rates
        may apply.
      </p>
    </form>
  );
}
