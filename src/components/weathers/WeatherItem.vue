<template>
    <div class='weather'>
        <div>{{ weather.city }}</div>
        <div class='base'>
            <img :src='weather.iconUrl' alt='weather icon'/>
            <div>{{ weather.temperature.toFixed(0) }} &#8451;</div>
        </div>
        <div class='details'>
            <div class='temperatureFeels'>
                Feels like {{ weather.temperatureFeels }} &#8451;
            </div>
            <div class='list'>
                <div class='wind'>
                    <ArrowUpOutlined class='wind-direction'/>
                    {{ weather.windSpeed }}m/s
                </div>
                <div class='pressure'>
                    <DashboardOutlined/>
                    {{ weather.pressure }}hPa
                </div>
                <div class='humidity'>
                    <span class='subtitle'>Humidity:</span>
                    {{ weather.humidity }}%
                </div>
                <div class='visibility'>
                    <span class='subtitle'>Visibility:</span>
                    {{ weather.visibility }}km
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {Weather} from '@/models/Weather'
import {ArrowUpOutlined, DashboardOutlined} from '@ant-design/icons-vue'

export default defineComponent({
    name: 'WeatherItem',
    components: {ArrowUpOutlined, DashboardOutlined},
    props: {
        weather: {
            type: Object as PropType<Weather>,
            required: true
        }
    },
    data() {
        return {
            degreeRotate: 'rotate(' + this.weather.windDegree + 'deg)'
        }
    }
})
</script>

<style scoped lang="scss">
.weather:not(:last-child) {
    border-bottom: 1px solid lightgray;
}

.weather:not(:first-child) {
    padding-top: 10px;
}

.base {
    display: flex;
    justify-content: center;
    margin-top: 5px;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
}

.wind-direction {
    transform: v-bind('degreeRotate');
}

.temperatureFeels {
    margin-bottom: 20px;
    text-align: center;
}

.list {
    display: flex;
    flex-wrap: wrap;
    div {
        flex-basis: 50%;
        margin-bottom: 10px;
    }
}

.subtitle {
    font-size: 10px;
}
</style>