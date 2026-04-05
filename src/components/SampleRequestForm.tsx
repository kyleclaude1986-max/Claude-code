"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

interface Props {
  tileId: string;
  phone?: string;
  clientName?: string;
  clientAddress?: string;
}

export default function SampleRequestForm({
  tileId,
  phone = "",
  clientName = "",
  clientAddress = "",
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [firstName, lastName] = clientName.split(" ", 2);
  const addressParts = clientAddress.split(", ");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      tileId,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim(),
      street: (form.elements.namedItem("street") as HTMLInputElement).value.trim(),
      city: (form.elements.namedItem("city") as HTMLInputElement).value.trim(),
      state: (form.elements.namedItem("state") as HTMLInputElement).value.trim(),
      zip: (form.elements.namedItem("zip") as HTMLInputElement).value.trim(),
    };

    try {
      const res = await fetch("/api/sample-request", {
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

      router.push("/sample-confirmed");
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
            type="text"
            defaultValue={firstName || ""}
            readOnly
            className="w-full px-4 py-3.5 text-base border-[1.5px] border-gray-200 rounded-xl bg-gray-100 text-gray-600"
          />
        </div>
        <div className="mb-1">
          <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">
            Last Name
          </label>
          <input
            type="text"
            defaultValue={lastName || ""}
            readOnly
            className="w-full px-4 py-3.5 text-base border-[1.5px] border-gray-200 rounded-xl bg-gray-100 text-gray-600"
          />
        </div>
      </div>

      <div className="mb-5 mt-4">
        <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">
          Phone Number
        </label>
        <input
          name="phone"
          type="tel"
          defaultValue={phone}
          readOnly
          className="w-full px-4 py-3.5 text-base border-[1.5px] border-gray-200 rounded-xl bg-gray-100 text-gray-600"
        />
      </div>

      <div className="mb-5">
        <label className="block text-[13px] font-semibold text-gray-900 mb-1.5">
          Street Address
        </label>
        <input
          name="street"
          type="text"
          defaultValue={addressParts[0] || ""}
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
            defaultValue={addressParts[1] || ""}
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
            defaultValue={addressParts[2] || ""}
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
            defaultValue={addressParts[3] || ""}
            required
            className="w-full px-4 py-3.5 text-base border-[1.5px] border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 text-[17px] font-semibold bg-accent text-white rounded-xl hover:bg-accent-hover transition-all hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed mt-2 cursor-pointer"
      >
        {loading ? "Submitting..." : "Confirm & Send My Free Sample"}
      </button>

      <p className="text-center mt-4 text-[13px] text-gray-400">
        Your sample will typically arrive within 5-7 business days.
      </p>
    </form>
  );
}
