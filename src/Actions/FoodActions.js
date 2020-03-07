import {
  ITEM_SELECTED,
  DELETE_ORDERED_ITEM,
  CREATE_ORDER,
  CLEAR_ALL_ORDERED_ITEMS,
  EDIT_ORDERED_ITEM,
  SET_CURRENT_TABLE_NO,
  PAYMENT_DONE,
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
export const saveTableNumber = (tableNo, waiterCode) => ({
  type: CREATE_ORDER,
  tableNo,
  waiterCode,
});
export const clearAllOrderedItems = tableNo => ({
  type: CLEAR_ALL_ORDERED_ITEMS,
  tableNo,
});
export const editOrderedItems = editedOrderedItem => ({
  type: EDIT_ORDERED_ITEM,
  editedOrderedItem,
});
export const setCurrentTable = tableNo => ({
  type: SET_CURRENT_TABLE_NO,
  tableNo,
});
export const updatePaymentStatus = payment => ({
  type: PAYMENT_DONE,
  payment,
});
