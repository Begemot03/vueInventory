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
        class="inventory__item drag-el" 
        :class="'item' + itemType"
    ></div>
</template>

<style lang="scss" scoped>

</style>
