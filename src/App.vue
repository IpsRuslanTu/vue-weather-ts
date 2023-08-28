<template>
    <div class='app'>
        <a-spin :spinning='spinning'>
            <page-switcher
                :mode='pageMode'
                :toggle='toggleMode'/>
            <main-page
                v-if='pageMode === PageMode.Main'
                :weather-list='weatherList'/>
            <settings-page
                v-if='pageMode === PageMode.Settings'/>
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
        const localStorageCityList = localStorage.getItem('city-list')
        if (localStorageCityList) {
            this.cityList = JSON.parse(localStorageCityList)
        }

        if (this.weatherList.length > 0) {
            //
        } else {
            this.spinning = true
            try {
                const {coords} = await this.getCurrentPosition()
                const geocode: Geocode = {
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }
                const weather = await WeatherApi.fetchByCoordinates(geocode)
                this.weatherList = [weather]
            } catch (e) {
                this.openNotification(
                    'We don\'t know your location. :) You can add the desired city in settings.'
                )
            } finally {
                this.spinning = false
            }
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
}

.ant-spin-nested-loading {
    height: 100%;
}
</style>