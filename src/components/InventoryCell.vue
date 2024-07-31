<script setup lang="ts">
import { useInventoryStore, type IInventoryCell } from '@/stores/inventory';
import InventoryItem from './InventoryItem.vue';
import { defineProps, computed } from 'vue';

const props = defineProps({
    id: {
        type: Number,
        required: true,
    }
});

const inventoryStore = useInventoryStore();

const cell = computed(() => inventoryStore.getItem(props.id));

const removeItem = () => {
    inventoryStore.removeItem(props.id);
};

const pushItem = () => {
    inventoryStore.addItem(props.id, { id: props.id, itemType: Math.floor(Math.random() * 2) + 1, count: 2 });
}

function startDrag(event: any, curCell: IInventoryCell) {
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('itemID', curCell.id)
}

function onDrop(event: any, curCell: IInventoryCell) {
    const prevCellId = event.dataTransfer.getData('itemID')
    inventoryStore.swapTwoCells(prevCellId, curCell.id);
}
</script>

<template>
    <div 
        class="inventory-cell drop-zone"
        @drop="onDrop($event, cell)"
        @dragover.prevent
        @dragenter.prevent
    >
        <InventoryItem 
            v-if="cell.itemType !== 0"
            :itemType="cell.itemType" 
            draggable="true"
            @dragstart="startDrag($event, cell)"
        />

        <!-- <button class="" @click="pushItem">Добавить</button> -->
    </div>
</template>

<style lang="scss" scoped>
$cell-border-color: #fff;

.inventory-cell {
    position: relative;
    width: 128px;
    height: 128px;
    padding: 12px;

    border: 1px solid $cell-border-color;

    &_item {
        width: 64px;
        height: 64px;
        cursor: pointer;

        position: absolute;
        left: 50%;
        bottom: 50%;
        transform: translate(-50%, 50%);
    }
}
</style>
