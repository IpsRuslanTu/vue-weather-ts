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
import {PageMode} from '@/types/PageMode'

export default defineComponent({
    components: {
        SettingOutlined,
        CloseOutlined
    },
    data() {
        return {
            PageMode
        }
    },

  props: {
      mode: {
          type: String as PropType<PageMode>,
          required: true
      },
      toggle: {
          type: Function,
          required: true
      }
  }
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