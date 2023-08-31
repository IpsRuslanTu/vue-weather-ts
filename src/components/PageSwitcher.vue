<template>
    <button class='button' @click='toggle'>
        <close-outlined v-if='mode === PageMode.Settings'/>
        <setting-outlined v-if='mode === PageMode.Main'/>
    </button>
</template>

<script lang="ts">

import {
    SettingOutlined,
    CloseOutlined
} from '@ant-design/icons-vue'
import {defineComponent, PropType} from 'vue'
import {PageMode} from '@/models/PageMode'

export default defineComponent({
    components: {
        SettingOutlined,
        CloseOutlined
    },
    props: {
        mode: {
            type: String as PropType<PageMode>,
            required: true
        }
    },
    data() {
        return {
            PageMode
        }
    },
    methods: {
        toggle() {
            this.$emit('toggle')
        }
    },
    emits: ['toggle']
})
</script>

<style lang="scss" scoped>
.button {
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    border: none;
    cursor: pointer;
}
</style>