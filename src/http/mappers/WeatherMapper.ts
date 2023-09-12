import { Weather } from '@/models/Weather'
import { WeatherResponse } from '../apiTypes'

export class WeatherMapper {
    public static mapFromApi(apiWeather: WeatherResponse): Weather {
        return {
            city: apiWeather.location.name,
            temperature: apiWeather.current.temp_c,
            temperatureFeels: apiWeather.current.feelslike_c,
            pressure: apiWeather.current.pressure_mb,
            humidity: apiWeather.current.humidity,
            visibility: apiWeather.current.vis_km,
            windSpeed: apiWeather.current.wind_mph,
            windDegree: apiWeather.current.wind_degree,
            iconUrl: apiWeather.current.condition.icon
        }
    }
}