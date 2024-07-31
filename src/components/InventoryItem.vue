<script setup lang="ts">

const props = defineProps({
    itemType: {
        type: Number,
        required: true,
    },
});

</script>

<template>
    <div 
        class="inventory-cell_item drag-el" 
        :class="props.itemType == 0 ? '' : (props.itemType == 1 ? 'red' : 'green')"
    ></div>
</template>

<style lang="scss" scoped>
.red {
    background-color: #f52d2d;
}

.green {
    background-color: #00ff00;
}
</style>
