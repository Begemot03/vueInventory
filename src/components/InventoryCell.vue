<script setup lang="ts">
import { useInventoryStore, type IInventoryCell } from '@/stores/inventory';
import InventoryItem from './InventoryItem.vue';
import { defineProps, computed, defineEmits } from 'vue';

const props = defineProps({
    id: {
        type: Number,
        required: true,
    }
});

const emits = defineEmits(["dropcb"])

const inventoryStore = useInventoryStore();
const cell = computed(() => inventoryStore.getItem(props.id));

function startDrag(event: DragEvent, curCell: IInventoryCell) {
    if(event.dataTransfer) event.dataTransfer.dropEffect = 'move';
    if(event.dataTransfer) event.dataTransfer.effectAllowed = 'move';

    event?.dataTransfer?.setData('itemID', curCell.id.toString());
}

function onDrop(event: any, curCell: IInventoryCell) {
    const prevCellId = event.dataTransfer.getData('itemID')
    emits("dropcb", parseInt(curCell.id.toString()));
    inventoryStore.swapTwoCells(prevCellId, curCell.id);
}
</script>

<template>
    <div 
        class="inventory-cell"
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
        <div 
            v-if="cell.itemType !== 0" 
            class="inventory-cell__count"
        >{{ cell.count }}</div>
    </div>
</template>

<style lang="scss" scoped>

</style>
