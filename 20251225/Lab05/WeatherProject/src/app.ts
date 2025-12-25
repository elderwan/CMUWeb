import "dotenv/config";
import express, { Request, Response } from "express";
import path from "path";

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "../public")));

type WeatherResp = {
    coord: { lon: number; lat: number };
    main: { temp: number };
    weather: { description: string; icon: string }[];
};

type PollutionResp = {
    list: {
        main: { aqi: number }; components: { pm2_5: number; pm10: number }
    }[];
};
app.get("/api/weather", async (req: Request, res: Response) => {
    const city = (req.query.city as string) || "London";
    const appKey = process.env.OPENWEATHER_KEY;
    console.log(`Fetching weather for appKey: ${appKey} city: ${city}`);
    if (!appKey) return res.status(500).json({
        message: "Missing OPENWEATHER_KEY"
    });

    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appKey}&units=metric`;

    try {
        // 1. Call Weather endpoint to get temp, description, icon, and lat/lon
        const weatherRes = await fetch(urlWeather);
        if (!weatherRes.ok) {
            return res.status(502).json({ message: "Failed to fetch weather data" });
        }
        const weatherData = (await weatherRes.json()) as WeatherResp;
        // 2. Extract values from weather response
        const { coord, main, weather } = weatherData;
        if (!weather || weather.length === 0) {
            return res.status(502).json({ message: "Invalid weather data" });
        }
        const weatherInfo = weather[0]!;
        // 3. Call Air pollution endpoint using lat and lon
        const urlPollution = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=${appKey}`;
        const pollutionRes = await fetch(urlPollution);
        if (!pollutionRes.ok) {
            return res.status(502).json({ message: "Failed to fetch pollution data" });
        }
        const pollutionData = (await pollutionRes.json()) as PollutionResp;
        // 4. Extract air quality values
        if (!pollutionData?.list?.[0]?.main || !pollutionData?.list?.[0]?.components) {
            return res.status(502).json({ message: "Invalid pollution data" });
        }
        const { aqi } = pollutionData.list[0].main;
        const { pm2_5, pm10 } = pollutionData.list[0].components;
        // 5. Return JSON in the required format
        /**
         * example response:
         * { 
            "city": "London", 
            "temp": 18.6, 
            "desc": "broken clouds", 
            "iconUrl": "https://openweathermap.org/img/wn/04d@2x.png", 
            "aqi": 2, 
            "pm25": 6.12, 
            "pm10": 10.34 
             }* 
         */
        return res.json({
            city,
            temp: main.temp,
            desc: weatherInfo.description,
            iconUrl: `https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`,
            aqi,
            pm25: pm2_5,
            pm10
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching weather data" });
    }
});

app.listen(port, () => console.log(`http://localhost:${port}`));