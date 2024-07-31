<script setup lang="ts">
import { useInventoryStore } from '@/stores/inventory';
import { computed, ref } from 'vue';


const props = defineProps({
    curCellId: {
        type: Number,
        required: true,
    },
    isHidden: {
        type: Boolean,
        required: true,
    },
})

const emits = defineEmits(['close'])

let isOptionVisible = ref(false);
let count = ref(0)

const inventoryStore = useInventoryStore();

const cell = computed(() => inventoryStore.getItem(props.curCellId));

const removeItem = () => {
    inventoryStore.removeItemCount(props.curCellId, count.value);
    emits("close");
}

const showOption = () => {
    isOptionVisible.value = true;
}

const hideOption = () => {
    isOptionVisible.value = false;
}

</script>

<template>
    <div 
        class="inventory-modal"
        :class="props.isHidden ? 'hidden' : ''"
    >
        <div 
            class="inventory-modal__img"
            :class="'item' + cell.itemType"
        ></div>
        <div class="inventory-modal__slash"></div>
        <div class="ghost ghost-h1 ghost-90"></div>
        <div class="ghost ghost-p ghost-90"></div>
        <div class="ghost ghost-p ghost-90"></div>
        <div class="ghost ghost-p ghost-90"></div>
        <div class="ghost ghost-p ghost-80"></div>
        <div class="ghost ghost-p ghost-50"></div>
        <div class="inventory-modal__slash"></div>
        <button
            class="inventory-modal__btn"
            @click="showOption"
        >Удалить предмет</button>
        <div class="inventory-modal__options" :class="isOptionVisible ? '' : 'hidden'">
            <input
                v-model="count"
                placeholder="Введите количество...">
            <div class="btns">
                <button @click="hideOption">Отмена</button>
                <button @click="removeItem()">Подтвердить</button>
            </div>
            
        </div>

        <div 
            class="inventory-modal__close"
            @click="() => $emit('close')"
        ></div>
    </div>
</template>

<style lang="scss" scoped>

</style>
