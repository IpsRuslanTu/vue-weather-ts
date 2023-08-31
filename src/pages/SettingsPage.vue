<template>
    <div>
        <div class='title'>Settings</div>
        <settings-item
            v-for='item in weatherList'
            :key='item.city'
            :item='item'
            @remove='remove'
        />
        <div class='title'>Add location</div>
        <post-setting-item @post='post'/>
    </div>
</template>

<script lang="ts">
import {Weather} from '@/models/Weather'
import {defineComponent, PropType} from 'vue'
import SettingsItem from '@/components/settings/SettingsItem.vue'
import PostSettingItem from '@/components/settings/PostSettingItem.vue'

export default defineComponent({
    name: 'SettingsPage',
    components: {PostSettingItem, SettingsItem},
    props: {
        weatherList: {
            type: Array as PropType<Weather[]>,
            required: true
        }
    },
    methods: {
        remove(name: string) {
            this.$emit('remove', name)
        },
        post(newCity: string) {
            this.$emit('post', newCity)
        }
    },
    emits: {
        remove: (name: string) => true,
        post: (newCity: string) => true
    }
})
</script>

<style scoped>
.title {
    margin-bottom: 15px;
}
</style>