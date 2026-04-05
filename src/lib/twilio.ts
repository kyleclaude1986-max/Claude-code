import Twilio from "twilio";

const client = Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

const FROM_NUMBER = process.env.TWILIO_PHONE_NUMBER!;

export async function sendTileMMS(
  to: string,
  imageUrl: string,
  description: string,
  sampleLink: string
) {
  const body = `${description}\n\nLove this tile? Get a FREE sample:\n${sampleLink}`;

  return client.messages.create({
    to,
    from: FROM_NUMBER,
    body,
    mediaUrl: [imageUrl],
  });
}

export async function sendBulkTileMMS(
  clients: { phone: string }[],
  tile: {
    imageUrl: string;
    description: string;
    tileId: string;
  }
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const results: { phone: string; success: boolean; error?: string }[] = [];

  for (const client of clients) {
    const sampleLink = `${baseUrl}/sample/${tile.tileId}?phone=${encodeURIComponent(client.phone)}`;
    try {
      await sendTileMMS(client.phone, tile.imageUrl, tile.description, sampleLink);
      results.push({ phone: client.phone, success: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      results.push({ phone: client.phone, success: false, error: message });
      console.error(`Failed to send to ${client.phone}:`, message);
    }
  }

  return results;
}
