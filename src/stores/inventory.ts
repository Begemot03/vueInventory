import { ref } from 'vue'
import { defineStore } from 'pinia'

export type IInventoryCell = {
	id: number;
  	count: number;
  	itemType: number;
}

const emptyCell = {
	count: 0,
	itemType: 0,
}

export const useInventoryStore = defineStore('inventory', () => {
  	const items = ref<Array<IInventoryCell>>(
		Array.from({ length: 25 }, (_, i) => ({ count: 1, itemType: Math.floor(Math.random() * 3), id: i }))
	);

	function addItem(id: number, newItem: IInventoryCell) {
		items.value[id] = {
			id,
			count: newItem.count,
			itemType: newItem.itemType,
		};
	}

	function swapTwoCells(lId: number, rId: number) {
		const leftItem = items.value[lId];
		const rightItem = items.value[rId];
		leftItem.id = rId;
		rightItem.id = lId;

		items.value[lId] = rightItem;
		items.value[rId] = leftItem;
	}


	function getItem(id: number): IInventoryCell {
		return items.value[id];
	}

	function removeItem(id: number): void {
		items.value[id] = {
			...emptyCell,
			id,
		};
	}
  
  	return { 
		items, 
		addItem, 
		getItem,
		removeItem,
		swapTwoCells,
	};
})
