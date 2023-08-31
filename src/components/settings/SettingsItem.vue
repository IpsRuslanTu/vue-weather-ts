<template>
    <div class='item'>
        <div>
            <menu-outlined class='icon' />{{ item.city }}
        </div>
        <div class='buttons'>
            <delete-outlined @click='remove'/>
        </div>
    </div>
</template>

<script lang="ts">
import {
    DeleteOutlined,
    ExclamationCircleOutlined,
    MenuOutlined
} from '@ant-design/icons-vue'
import {Modal} from 'ant-design-vue'
import {defineComponent, createVNode, PropType} from 'vue'
import {Weather} from '@/models/Weather'

export default defineComponent({
    components: {
        MenuOutlined,
        DeleteOutlined
    },
    props: {
        item: {
            type: Object as PropType<Weather>,
            required: true
        }
    },
    data() {
        return {
            isDialogVisible: false
        }
    },
    methods: {
        remove() {
            Modal.confirm({
                title: 'Confirm',
                icon: createVNode(ExclamationCircleOutlined),
                content: 'Are you sure to delete this item?',
                okText: 'Yes',
                cancelText: 'No',
                onOk: () => {
                    this.$emit('remove', this.item.city)
                }
            })
        }
    },
    emits: {
        remove: (name: string) => true
    }
})
</script>

<style lang="scss" scoped>
.item {
    display: flex;
    justify-content: space-between;
    background-color: lightgray;
    margin-bottom: 15px;
    padding: 5px;
}

.icon {
    margin-right: 7px;
}
</style>