<template>
    <div class='app'>
        <a-spin :spinning='spinning'>
            <page-switcher :mode='pageMode' :toggle='toggleMode'/>
        </a-spin>
        <main-page v-if='pageMode === PageMode.Main'/>
        <settings-page v-if='pageMode === PageMode.Settings'/>
    </div>
</template>

<script>
import {defineComponent} from 'vue'
import PageSwitcher from '@/components/PageSwitcher.vue'
import {PageMode} from '@/types/PageMode'
import MainPage from '@/pages/MainPage.vue'
import SettingsPage from '@/pages/SettingsPage.vue'

export default defineComponent({
    components: {
        SettingsPage,
        MainPage,
        PageSwitcher
    },
    data() {
        return {
            spinning: false,
            pageMode: PageMode.Main,
            PageMode
        }
    },
    methods: {
        toggleMode() {
            this.pageMode = this.pageMode === PageMode.Main
                ? PageMode.Settings
                : PageMode.Main
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
</style>