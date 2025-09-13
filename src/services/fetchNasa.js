import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const KEY_NASA = process.env.NASA_API_KEY
const URL = `https://api.nasa.gov/insight_weather/?api_key=${KEY_NASA}&feedtype=json&ver=1.0`

export const fetchNasa = async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    const solKeys = data.sol_keys;

    for (const sol of solKeys){
        const solData = data[sol];
        const temp_min = solData.AT ? solData.AT.mn : null;
        const temp_max = solData.AT ? solData.AT.mx : null;
        const temp_avg = solData.AT ? solData.AT.av : null;
        const wind_speed = solData.HWS ? solData.HWS.av : null;
        const pressure = solData.PRE ? solData.PRE.av : null;
        const earth_date = solData.First_UTC ;

        await prisma.sol.upsert({
            where: { id: sol },
            update: {
                earthDate: earth_date,                   
                minTemp: temp_min,  
                maxTemp: temp_max,   
                avgTemp: temp_avg,  
                pressure:  pressure,
                windSpeed: wind_speed,
                rawJson: JSON.stringify(solData)
            },
            create: {
                id: sol,
                earthDate: earth_date,                   
                minTemp: temp_min,
                maxTemp: temp_max,
                avgTemp: temp_avg,
                pressure: pressure,
                windSpeed: wind_speed,
                rawJson: JSON.stringify(solData)
            }
        })

    }
} catch (error) {
    console.error("Error fetching data from NASA API:", error);
  }
}