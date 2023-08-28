import $api from '@/http/index'
import {Geocode} from '@/models/Geocode'
import {WeatherResponse} from '@/http/apiTypes'
import {WeatherMapper} from '@/http/mappers/WeatherMapper'
import {Weather} from '@/models/Weather'

export class WeatherApi {
    public static async fetchByCoordinates(geocode: Geocode): Promise<Weather> {
        const {data} = await $api.get<WeatherResponse>('/current.json', {
            params: {
                q: `${geocode.latitude},${geocode.longitude}`
            }
        })

        return WeatherMapper.mapFromApi(data)
    }
}