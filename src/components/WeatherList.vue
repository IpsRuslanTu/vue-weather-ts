<template>
    <div>
        <weather-item
            v-for='item in weatherList'
            :key='item.city'
            :weather='item'/>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import WeatherItem from '@/components/WeatherItem.vue'
import {Weather} from '@/models/Weather'

export default defineComponent({
    name: 'WeatherList',
    components: {WeatherItem},
    props: {
        weatherList: {
            type: Array as PropType<Weather[]>,
            required: true
        }
    }
})
</script>

<style scoped>

</style>