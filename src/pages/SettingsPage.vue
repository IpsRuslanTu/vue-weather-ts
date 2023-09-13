<template>
    <div>
        <div class='title'>Settings</div>
        <setting-list
            :city-list='weatherList'
            @remove='remove'
            @reorder='reorder'
        />
        <div class='title'>Add location</div>
        <post-input-value
            placeholder='Input city'
            @post='post'
        />
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {Weather} from '@/models/Weather'
import PostInputValue from '@/components/postInputValue/PostInputValue.vue'
import SettingList from '@/components/settings/SettingList.vue'

export default defineComponent({
    name: 'SettingsPage',
    components: {SettingList, PostInputValue},
    props: {
        weatherList: {
            type: Array as PropType<Weather[]>,
            required: true
        }
    },
    methods: {
        post(newCity: string) {
            this.$emit('post', newCity)
        },
        remove(name: string) {
            this.$emit('remove', name)
        },
        reorder(oldIndex: number, newIndex: number) {
            this.$emit('reorder', oldIndex, newIndex)
        }
    },
    emits: {
        remove: (name: string) => true,
        post: (newCity: string) => true,
        reorder: (oldIndex: number, newIndex: number) => true
    }
})
</script>

<style scoped>
.title {
    margin-bottom: 15px;
}
</style>