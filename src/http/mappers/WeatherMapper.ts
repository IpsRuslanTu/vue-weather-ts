import { Weather } from '@/models/Weather'
import { WeatherResponse } from '../apiTypes'

export class WeatherMapper {
    public static mapFromApi(apiWeather: WeatherResponse): Weather {
        return {
            city: apiWeather.location.name,
            temperature: apiWeather.current.temp_c,
            iconUrl: apiWeather.current.condition.icon
        }
    }
}