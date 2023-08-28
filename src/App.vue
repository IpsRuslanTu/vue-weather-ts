<template>
    <div class='app'>
        <a-spin :spinning='spinning'>
            <page-switcher :mode='pageMode' :toggle='toggleMode'/>
        </a-spin>
    </div>
</template>

<script>
import PageSwitcher from '@/components/PageSwitcher.vue'
import {defineComponent} from 'vue'
import {PageMode} from '@/types/PageMode'

export default defineComponent({
    components: {
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