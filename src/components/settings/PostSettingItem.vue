<template>
    <form @submit.prevent class='form'>
        <a-input
            size='small'
            class='input'
            v-model:value='inputValue'
            placeholder='Input city'
        />
        <enter-outlined @click='post'/>
    </form>
</template>

<script lang="ts">
import {EnterOutlined} from '@ant-design/icons-vue'
import {defineComponent, ref} from 'vue'

export default defineComponent({
    components: {EnterOutlined},
    setup() {
        const inputValue = ref('')
        return {
            inputValue,
        }
    },
    methods: {
        post() {
            this.$emit('post', this.inputValue)
            this.inputValue = ''
        }
    },
    emits: {
        post: (inputValue: string) => true
    }
})
</script>

<style scoped>
.form {
    display: flex;
    align-items: center;
    gap: 10px;
}

.input {
    flex: 1;
}
</style>