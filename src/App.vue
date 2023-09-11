<template>
    <div class='app'>
        <a-spin :spinning='spinning'>
            <page-switcher
                :mode='pageMode'
                @toggle='toggleMode'
            />
            <main-page
                v-if='pageMode === PageMode.Main'
                :weather-list='weatherList'
                :start-interval-request='startIntervalRequest'
                :stop-interval-request='stopIntervalRequest'
            />
            <settings-page
                v-if='pageMode === PageMode.Settings'
                :weather-list='weatherList'
                @post='postCity'
                @remove='removeWeather'
                @reorder='reorderWeatherList'
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
import {LOCAL_STORAGE_KEY, REQUEST_INTERVAL} from '@/config'

interface State {
    spinning: boolean
    pageMode: PageMode
    weatherList: Weather[]
    PageMode: typeof PageMode
    intervalRequests: number | undefined
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
            weatherList: [],
            intervalRequests: undefined,
            PageMode
        }
    },
    async mounted() {
        const cityList = this.getCitiesFromLocalStorage()
        if (cityList.length > 0) {
            await this.getWeatherList(cityList)
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
        async startIntervalRequest() {
            this.intervalRequests = setInterval(async () => {
                await this.fetchWeatherFromStorageCities()
            }, REQUEST_INTERVAL)
        },
        stopIntervalRequest() {
            clearInterval(this.intervalRequests)
        },
        async fetchWeatherFromStorageCities() {
            const cityList = this.getCitiesFromLocalStorage()
            if (cityList.length > 0) {
                await this.getWeatherList(cityList)
            }
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
                this.updateLocalStorage()
            } catch (e) {
                this.openNotification(
                    'We don\'t know your location. :) You can add the desired city in settings.'
                )
            } finally {
                this.spinning = false
            }
        },
        async getWeatherList(cityList: string[]) {
            this.spinning = true
            try {
                this.weatherList = await WeatherApi.fetchWeatherList(cityList)
            } catch (e) {
                this.openNotification(
                    'Error request'
                )
            } finally {
                this.spinning = false
            }
        },
        async postCity(newCity: string) {
            try {
                const newWeather = await WeatherApi.fetchWeatherList([newCity])
                this.weatherList.push(newWeather[0])
                this.updateLocalStorage()
            } catch (e) {
                this.openNotification(
                    'Please, check the correctness of city.'
                )
            } finally {
                this.spinning = false
            }
        },
        removeWeather(city: string) {
            this.weatherList = this.weatherList.filter(i => i.city !== city)
            this.updateLocalStorage()
        },
        reorderWeatherList(oldIndex: number, newIndex: number) {
            const tempWeather = this.weatherList[oldIndex]
            this.weatherList[oldIndex] = this.weatherList[newIndex]
            this.weatherList[newIndex] = tempWeather
            this.updateLocalStorage()
        },
        getCitiesFromLocalStorage(): string[] {
            const localStorageCityList = localStorage.getItem(LOCAL_STORAGE_KEY)
            let cityList = []
            if (localStorageCityList) {
                cityList = JSON.parse(localStorageCityList)
            }

            return cityList
        },
        updateLocalStorage() {
            localStorage.setItem(
                LOCAL_STORAGE_KEY,
                JSON.stringify(this.weatherList.map(i => i.city))
            )
        }
    }
})
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, serif;
}

.app {
  position: relative;
  width: 200px;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid grey;
  overflow-y: auto;
}

.ant-spin-nested-loading {
  height: 100%;
}
</style>