import { sampleDiscordPresence } from "@/config/sample";
import { type DiscordStatusResponse, type LanyardData } from "@/lib/discord-status";
import { NextResponse } from "next/server";

const rawUserId = process.env.DISCORD_USER_ID ?? "";
// Discord snowflakes are 17-20 digit numeric strings
const DISCORD_USER_ID = /^\d{17,20}$/.test(rawUserId) ? rawUserId : null;

export const dynamic = "force-dynamic";

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate",
};

export async function GET() {
  if (!DISCORD_USER_ID) {
    return NextResponse.json<DiscordStatusResponse>(
      { ...sampleDiscordPresence, isSample: true },
      { headers: NO_CACHE_HEADERS },
    );
  }

  try {
    const response = await fetch(
      `https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`,
      {
        cache: "no-store",
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Discord status from Lanyard." },
        { status: response.status, headers: NO_CACHE_HEADERS },
      );
    }

    const data = (await response.json()) as {
      success: boolean;
      data?: LanyardData;
    };

    if (!data.success || !data.data) {
      return NextResponse.json(
        { error: "Invalid Discord status response." },
        { status: 502, headers: NO_CACHE_HEADERS },
      );
    }

    return NextResponse.json<DiscordStatusResponse>(data.data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Could not reach Lanyard API." },
      { status: 502, headers: NO_CACHE_HEADERS },
    );
  }
}
