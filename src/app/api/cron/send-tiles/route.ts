import { NextResponse } from "next/server";
import { getActiveClients, getTileForDate, updateTileStatus } from "@/lib/airtable";
import { sendBulkTileMMS } from "@/lib/twilio";

export async function GET(request: Request) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get today's date in Central Time
    const now = new Date();
    const centralDate = new Date(
      now.toLocaleString("en-US", { timeZone: "America/Chicago" })
    );
    const dateStr = centralDate.toISOString().split("T")[0];

    // Check if today is Mon, Wed, or Fri (extra safety check)
    const day = centralDate.getDay();
    if (day !== 1 && day !== 3 && day !== 5) {
      return NextResponse.json({
        message: "Not a scheduled send day",
        date: dateStr,
      });
    }

    // Get today's tile
    const tile = await getTileForDate(dateStr);
    if (!tile) {
      console.warn(`No tile scheduled for ${dateStr}`);
      return NextResponse.json({
        message: "No tile scheduled for today",
        date: dateStr,
      });
    }

    // Get all active clients
    const clients = await getActiveClients();
    if (clients.length === 0) {
      return NextResponse.json({
        message: "No active clients to send to",
        date: dateStr,
      });
    }

    // Get tile image URL (first attachment)
    const imageUrl = tile.fields.Image?.[0]?.url;
    if (!imageUrl) {
      console.error(`Tile ${tile.id} has no image attached`);
      return NextResponse.json(
        { error: "Tile has no image" },
        { status: 500 }
      );
    }

    // Send MMS to all clients
    const results = await sendBulkTileMMS(
      clients.map((c) => ({ phone: c.fields.Phone })),
      {
        imageUrl,
        description: tile.fields.Description,
        tileId: tile.id,
      }
    );

    // Mark tile as sent
    await updateTileStatus(tile.id, "Sent");

    const successful = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    return NextResponse.json({
      message: "Tile texts sent",
      date: dateStr,
      tileName: tile.fields["Tile Name"],
      totalClients: clients.length,
      successful,
      failed,
    });
  } catch (err) {
    console.error("Cron send-tiles error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
