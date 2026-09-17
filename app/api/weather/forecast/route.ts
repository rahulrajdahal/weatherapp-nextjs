import { weatherService } from "@/lib/services/weatherService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.trim();

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter 'q' is required." },
        { status: 400 }
      );
    }

    if (query.length > 100) {
      return NextResponse.json(
        { error: "Query parameter 'q' must not exceed 100 characters." },
        { status: 400 }
      );
    }

    const data = await weatherService.getForecast(query);

    return NextResponse.json({ data });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

