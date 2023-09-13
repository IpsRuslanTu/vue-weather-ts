<template>
    <draggable
            v-model='draggableList'
            item-key='name'
            handle='.icon'
            @change='finish'
    >
        <template #item='{ element }'>
            <div class='item'>
                <div>
                    <menu-outlined class='icon'/>
                    {{ element.city }}
                </div>
                <div class='buttons'>
                    <delete-outlined @click='() => remove(element.city)'/>
                </div>
            </div>
        </template>
    </draggable>
</template>

<script lang="ts">
import {createVNode, defineComponent, PropType} from 'vue'
import {DeleteOutlined, ExclamationCircleOutlined, MenuOutlined} from '@ant-design/icons-vue'
import {Modal} from 'ant-design-vue'
import draggable from 'vuedraggable'
import {Weather} from '@/models/Weather'

export default defineComponent({
    components: {draggable, DeleteOutlined, MenuOutlined},
    props: {
        cityList: {
            type: Array as PropType<Weather[]>,
            required: true
        }
    },
    data() {
        return {
            draggableList: this.cityList
        }
    },
    methods: {
        remove(name: string) {
            Modal.confirm({
                title: 'Confirm',
                icon: createVNode(ExclamationCircleOutlined),
                content: 'Are you sure to delete this item?',
                okText: 'Yes',
                cancelText: 'No',
                onOk: () => {
                    this.$emit('remove', name)
                    this.draggableList = this.draggableList.filter(i => i.city !== name)
                }
            })
        },
        finish(e: any) {
            this.$emit('reorder', e.moved.oldIndex, e.moved.newIndex)
        }
    },
    emits: {
        remove: (name: string) => true,
        reorder: (oldIndex: number, newIndex: number) => true
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
    cursor: move;
}
</style>