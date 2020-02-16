import {
  ITEM_SELECTED,
  DELETE_ORDERED_ITEM,
  CREATE_ORDER,
  CLEAR_ALL_ORDERED_ITEMS,
  EDIT_ORDERED_ITEM,
} from '../../Actions/ActionTypes';
const initialState = {
  tableNo: '',
};

const FindItemInOrder = (state, item) => {
  console.log('state from reducer ...', state);
  return state[state.tableNo]?.findIndex(
    element => element.itemCode === item.itemCode,
  );
};

const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEM_SELECTED:
      const itemIndex = FindItemInOrder(state, action.selectedItem);

      console.log('item index.....', itemIndex);

      if (itemIndex !== undefined && itemIndex !== -1) {
        let items = [...state[state.tableNo]];
        items[itemIndex].qty =
          parseInt(items[itemIndex].qty, 10) +
          parseInt(action.selectedItem.qty, 10) +
          '';
        return {
          ...state,
          [state.tableNo]: [...items],
        };
      }
      return {
        ...state,
        [state.tableNo]: [
          {...action.selectedItem, itemNo: state[state.tableNo].length},
          ...state[state.tableNo],
        ],
      };
    case DELETE_ORDERED_ITEM:
      return {
        ...state,
        [state.tableNo]: [
          ...state[state.tableNo].filter(
            item => item.itemNo !== action.deleteIndex,
          ),
        ],
      };
    case CREATE_ORDER:
      if (state[action.tableNo] === undefined) {
        return {
          ...state,
          tableNo: action.tableNo,
          [action.tableNo]: [],
        };
      }
      return {
        ...state,
        tableNo: action.tableNo,
      };
    case CLEAR_ALL_ORDERED_ITEMS: {
      return {
        ...state,
        [state.tableNo]: [],
      };
    }
    case EDIT_ORDERED_ITEM:
      const editedItemIndex = FindItemInOrder(state, action.editedOrderedItem);

      console.log('edited item index.....', itemIndex);

      if (editedItemIndex !== undefined && editedItemIndex !== -1) {
        let items = [...state[state.tableNo]];
        items[editedItemIndex] = {...action.editedOrderedItem};
        return {
          ...state,
          [state.tableNo]: [...items],
        };
      }
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default foodReducer;
