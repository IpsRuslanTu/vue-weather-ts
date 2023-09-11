<template>
    <div v-if='weatherList.length === 0'>No selected cities</div>
    <weather-list :weatherList='weatherList'/>
</template>

<script lang="ts">
import WeatherList from '@/components/WeatherList.vue'
import {Weather} from '@/models/Weather'
import {defineComponent, PropType} from 'vue'

export default defineComponent({
    name: 'MainPage',
    components: {WeatherList},
    props: {
        weatherList: {
            type: Array as PropType<Weather[]>,
            required: true
        },
        startIntervalRequest: {
            type: Function,
            required: true
        },
        stopIntervalRequest: {
            type: Function,
            required: true
        }
    },
    mounted() {
        this.startIntervalRequest()
    },
    unmounted() {
        this.stopIntervalRequest()
    }
})
</script>

<style scoped>

</style>