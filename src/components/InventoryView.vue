<script setup lang="ts">
import { ref } from 'vue';
import InventoryCell from './InventoryCell.vue';
import InventoryModal from './InventoryModal.vue';
import { useInventoryStore } from '@/stores/inventory';

let isFirst = ref(true);
let curId = ref(0);
let isModalHidden = ref(true);
const inventoryStore = useInventoryStore();

function openModal(id: number) {
    if(inventoryStore.isEmpty(id)) return;

    curId.value = id;
    isModalHidden.value = false;
}

function hideModal() {
    isModalHidden.value = true;
}

function dropCb(newId: number) {
    curId.value = newId;
    isFirst.value = false;
}

inventoryStore.$subscribe((mutation, state) => {
    localStorage.setItem("saves", JSON.stringify(state));
});

</script>

<template>
    <div class="inventory"
        @click="() => isFirst = false"
    >
        <div class="ghost-sidebar">
            <img src="../assets/imgBlur.png">
            <div class="ghost ghost-h1 ghost-90"></div>
            <div class="ghost ghost-p ghost-60"></div>
            <div class="ghost ghost-p ghost-90"></div>
            <div class="ghost ghost-p ghost-80"></div>
            <div class="ghost ghost-p ghost-70"></div>
            <div class="ghost ghost-p ghost-60"></div>
            <div class="ghost ghost-t ghost-50"></div>
        </div>
        <div class="inventory-view">
            <!-- Создаем 25 ячеек инвенторя и даем им каждый id -->
            <InventoryCell
                v-for="i in 25"
                :class="isFirst ? '' : (i - 1 === curId ? 'selected' : '')"
                :key="i"
                :id="i - 1"
                @click="() => { openModal(i - 1) }"
                @dropcb="dropCb"
            />
        </div>
        <div class="ghost-footer">
            <div class="ghost"></div>
        </div>
        <InventoryModal
            :isHidden="isModalHidden"
            :curCellId=curId
            @close="() => hideModal()"
        />
    </div>
</template>

<style lang="scss">

</style>
