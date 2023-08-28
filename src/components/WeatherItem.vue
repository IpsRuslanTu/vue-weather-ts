<template>
    <div>
        <div>{{ weather.city }}</div>
        <div>
            <img :src='weather.iconUrl' alt='weather icon'/>
            {{ weather.temperature }}
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {Weather} from '@/models/Weather'

export default defineComponent({
    name: 'WeatherItem',
    props: {
        weather: {
            type: Object as PropType<Weather>,
            required: true
        }
    }
})
</script>

<style scoped>

</style>