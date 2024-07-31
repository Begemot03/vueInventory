<script setup lang="ts">
import { useInventoryStore } from '@/stores/inventory';
import { computed } from 'vue';


const props = defineProps({
    curCellId: {
        type: Number,
        required: true,
    }
})

const inventoryStore = useInventoryStore();

const cell = computed(() => inventoryStore.getItem(props.curCellId));
const removeItem = () => inventoryStore.removeItem(props.curCellId);


</script>

<template>
    <button
        v-if="cell.itemType !== 0"
        @click="removeItem"
    >{{ props.curCellId }}</button>
</template>

<style lang="scss" scoped>
	
</style>
