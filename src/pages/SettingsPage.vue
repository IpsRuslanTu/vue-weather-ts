<template>
    <div>
        <div class='title'>Settings</div>
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
        <div class='title'>Add location</div>
        <post-input-value placeholder='Input city' @post='post'/>
    </div>
</template>

<script lang="ts">
import {createVNode, defineComponent, PropType} from 'vue'
import draggable from 'vuedraggable'
import {Weather} from '@/models/Weather'
import PostInputValue from '@/components/postInputValue/PostInputValue.vue'
import {DeleteOutlined, ExclamationCircleOutlined, MenuOutlined} from '@ant-design/icons-vue'
import {Modal} from 'ant-design-vue'

export default defineComponent({
    name: 'SettingsPage',
    components: {PostInputValue, MenuOutlined, DeleteOutlined, draggable},
    props: {
        weatherList: {
            type: Array as PropType<Weather[]>,
            required: true
        }
    },
    data() {
        return {
            draggableList: this.weatherList
        }
    },
    methods: {
        post(newCity: string) {
            this.$emit('post', newCity)
        },
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
        post: (newCity: string) => true,
        reorder: (oldIndex: number, newIndex: number) =>
            Number.isInteger(oldIndex) && Number.isInteger(newIndex)
    }
})
</script>

<style scoped>
.title {
    margin-bottom: 15px;
}

.item {
    display: flex;
    justify-content: space-between;
    background-color: lightgray;
    margin-bottom: 15px;
    padding: 5px;
}

.icon {
    margin-right: 7px;
    cursor: pointer;
}
</style>