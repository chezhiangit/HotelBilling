import {
  ITEM_SELECTED,
  DELETE_ORDERED_ITEM,
  CREATE_ORDER,
  CLEAR_ALL_ORDERED_ITEMS,
} from './ActionTypes';

export const saveOrder = (item, tableNo) => ({
  type: ITEM_SELECTED,
  selectedItem: item,
  tableNo,
});
export const deleteOrderedItem = index => ({
  type: DELETE_ORDERED_ITEM,
  deleteIndex: index,
});
export const saveTableNumber = tableNo => ({
  type: CREATE_ORDER,
  tableNo,
});
export const clearAllOrderedItems = tableNo => ({
  type: CLEAR_ALL_ORDERED_ITEMS,
  tableNo,
});
