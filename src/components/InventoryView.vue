<script setup lang="ts">
import { ref } from 'vue';
import InventoryCell from './InventoryCell.vue';
import InventoryModal from './InventoryModal.vue';

const curId = ref(0);

</script>

<template>
    <div>
        <div class="inventory">
        <!-- Создаем 25 ячеек инвенторя и даем им каждый id -->
            <InventoryCell
                v-for="i in 25"
                :key="i"
                :id="i - 1"
                @click="() => { curId = i - 1; }"
            />
        </div>
        <InventoryModal :curCellId="curId"/>
    </div>
    
</template>

<style lang="scss" scoped>
.inventory {
    display: grid;
    grid-template-columns: repeat(5, 128px);
    gap: 4px;
}
</style>
