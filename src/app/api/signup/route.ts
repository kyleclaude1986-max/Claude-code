import { NextResponse } from "next/server";
import { addClient, getClientByPhone } from "@/lib/airtable";

function formatPhoneE164(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, street, city, state, zip } = body;

    if (!firstName || !lastName || !phone || !email || !street || !city || !state || !zip) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const formattedPhone = formatPhoneE164(phone);
    if (!formattedPhone) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit US cell phone number." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const existing = await getClientByPhone(formattedPhone);
    if (existing) {
      return NextResponse.json(
        { error: "This phone number is already registered." },
        { status: 409 }
      );
    }

    const address = `${street}, ${city}, ${state}, ${zip}`;

    await addClient({
      firstName,
      lastName,
      phone: formattedPhone,
      email,
      address,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
