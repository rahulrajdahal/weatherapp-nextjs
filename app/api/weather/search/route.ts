import { type NextRequest, NextResponse } from "next/server";
import { CustomError } from "../forecast/route";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    console.log("searchParams", req.nextUrl);
    const query = searchParams.get("q");

    console.log(query, "quyer");

    const response = await fetch(
      `${process.env.API_URL}/search.json?key=${process.env.WEATHER_APIKEY}&q=${query}`
    );

    const responseJson = await response.json();

    console.log(responseJson, "respjson");

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

    console.log(locations, "locations");

    return NextResponse.json({
      data: locations,
    });
  } catch (error) {
    NextResponse.json({ error: "Server error" }, { status: 500 });
    console.log(error, "error");
    if (error instanceof CustomError) {
      NextResponse.json({ error: error.message }, { status: error.code });
    }
  }
}
