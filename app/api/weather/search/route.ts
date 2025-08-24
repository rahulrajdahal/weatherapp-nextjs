import { type NextRequest, NextResponse } from "next/server";
import { CustomError } from "../forecast/route";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("q");

    const response = await fetch(
      `${process.env.API_URL}/search.json?key=${process.env.WEATHER_APIKEY}&q=${query}`
    );

    const responseJson = await response.json();

    if (responseJson.error) {
      throw new CustomError("Error fetching locations", 400);
    }

    const locations = responseJson.map(
      (res: { id: number; region: string; name: string; country: string }) => ({
        id: res.id,
        name: res.region
          ? `${res.name},${res.region},${res.country}`
          : `${res.name},${res.country}`,
      })
    );

    return NextResponse.json({
      data: locations,
    });
  } catch (error) {
    NextResponse.json({ error: "Server error" }, { status: 500 });
    if (error instanceof CustomError) {
      NextResponse.json({ error: error.message }, { status: error.code });
    }
  }
}
