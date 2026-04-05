import { NextResponse } from "next/server";
import { getClientByPhone, createSampleRequest } from "@/lib/airtable";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tileId, phone, street, city, state, zip } = body;

    if (!tileId || !phone || !street || !city || !state || !zip) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const client = await getClientByPhone(phone);
    if (!client) {
      return NextResponse.json(
        { error: "We couldn't find your account. Please sign up first." },
        { status: 404 }
      );
    }

    const shippingAddress = `${street}, ${city}, ${state}, ${zip}`;

    await createSampleRequest({
      clientId: client.id,
      tileId,
      shippingAddress,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Sample request error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
