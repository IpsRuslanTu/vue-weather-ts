export interface WeatherResponse {
    location: WeatherLocationResponse
    current: WeatherTempResponse
}

interface WeatherLocationResponse {
    name: string
    country: string
}

interface WeatherTempResponse {
    temp_c: number,
    iconUrl: string
}