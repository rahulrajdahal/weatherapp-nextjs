import { ICurrentForecast } from "@/app/CurrentForecast";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    const response = await fetch(
      `${process.env.API_URL}/forecast.json?q=${query}&days=2&key=${process.env.WEATHER_APIKEY}`
    );

    const responseJson = await response.json();

    if (responseJson.error) {
      throw new CustomError("Error fetching forecast", 400);
    }

    const twentyFourHourforecast = responseJson.forecast.forecastday
      .map((forecastday: { hour: (ICurrentForecast & { time: string })[] }) =>
        forecastday.hour.filter((hour) => {
          if (
            moment(hour.time).format("L") ===
            moment(responseJson.current.last_updated).format("L")
          ) {
            return (
              moment(hour.time).format("HH") >=
              moment(responseJson.current.last_updated).format("HH")
            );
          }
          return hour;
        })
      )
      .flat()
      .slice(0, 24);

    return NextResponse.json({
      data: {
        forecast: twentyFourHourforecast,
        currentForecast: responseJson.current,
        currentLocation: responseJson.location,
      },
    });
  } catch (error) {
    NextResponse.json({ error: "Server error" }, { status: 500 });
    if (error instanceof CustomError) {
      NextResponse.json({ error: error.message }, { status: error.code });
    }
  }
}

export class CustomError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.name = "Bad Request";
    this.code = code;
  }
}
