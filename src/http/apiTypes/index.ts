export interface WeatherResponse {
    location: {
        name: string
        country: string
    }
    current: {
        temp_c: number,
        feelslike_c: number,
        pressure_mb: number,
        humidity: number,
        vis_km: number,
        wind_mph: number,
        wind_dir: string,
        condition: {
            icon: string
        }
    }
}