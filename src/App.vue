<template>
    <div class='app'>
        <a-spin :spinning='spinning'>
            <page-switcher
                :mode='pageMode'
                @toggle='toggleMode'
            />
            <main-page
                v-if='pageMode === PageMode.Main'
                :weather-list='weatherList'/>
            <settings-page
                v-if='pageMode === PageMode.Settings'
                :weather-list='weatherList'
                @post='postCity'
                @remove='removeWeather'
            />
        </a-spin>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import PageSwitcher from '@/components/PageSwitcher.vue'
import MainPage from '@/pages/MainPage.vue'
import SettingsPage from '@/pages/SettingsPage.vue'
import {PageMode} from '@/models/PageMode'
import {WeatherApi} from '@/http/weatherApi'
import {Weather} from '@/models/Weather'
import {Geocode} from '@/models/Geocode'
import {notification} from 'ant-design-vue'
import {LOCAL_STORAGE_KEY} from '@/config'

interface State {
    spinning: boolean
    pageMode: PageMode
    cityList: string[]
    weatherList: Weather[]
    PageMode: typeof PageMode
}

export default defineComponent({
    components: {
        SettingsPage,
        MainPage,
        PageSwitcher
    },
    data(): State {
        return {
            spinning: false,
            pageMode: PageMode.Main,
            cityList: [],
            weatherList: [],
            PageMode
        }
    },
    async mounted() {
        const localStorageCityList = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (localStorageCityList) {
            this.cityList = JSON.parse(localStorageCityList)
        }
        if (this.cityList.length > 0) {
            await this.getWeatherList()
        } else {
            await this.getCurrentPositionWeather()
        }
    },
    methods: {
        toggleMode() {
            this.pageMode = this.pageMode === PageMode.Main
                ? PageMode.Settings
                : PageMode.Main
        },
        // eslint-disable-next-line no-undef
        getCurrentPosition(): Promise<GeolocationPosition> {
            return new Promise((resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject)
            )
        },
        openNotification(message: string) {
            notification.open({
                message: 'Weather notification',
                description: message
            })
        },
        async getCurrentPositionWeather() {
            this.spinning = true
            try {
                const {coords} = await this.getCurrentPosition()
                const geocode: Geocode = {
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }
                const weather = await WeatherApi.fetchByCoordinates(geocode)
                this.weatherList = [weather]
                this.updateLocalStorage([weather.city])
            } catch (e) {
                this.openNotification(
                    'We don\'t know your location. :) You can add the desired city in settings.'
                )
            } finally {
                this.spinning = false
            }
        },
        async getWeatherList() {
            this.spinning = true
            try {
                this.weatherList = await WeatherApi.fetchWeatherList(this.cityList)
            } catch (e) {
                this.openNotification(
                    'Error request'
                )
            } finally {
                this.spinning = false
            }
        },
        async postCity(newCity: string) {
            this.cityList.push(newCity)

            try {
                this.weatherList = await WeatherApi.fetchWeatherList(this.cityList)
                this.updateLocalStorage(this.cityList)
            } catch (e) {
                this.openNotification(
                    'Error request'
                )
            } finally {
                this.spinning = false
            }
        },
        removeWeather(city: string) {
            this.weatherList = this.weatherList.filter(i => i.city !== city)
            this.updateLocalStorage(this.weatherList.map(i => i.city))
        },
        updateLocalStorage(cityList: string[]) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cityList))
        }
    }
})
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    position: relative;
    width: 200px;
    height: 300px;
    margin: 0 auto;
    padding: 10px;
    border: 1px solid grey;
    overflow-y: scroll;
}

.ant-spin-nested-loading {
    height: 100%;
}
</style>