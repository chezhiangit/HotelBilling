import {
  ITEM_SELECTED,
  DELETE_ORDERED_ITEM,
  CREATE_ORDER,
  CLEAR_ALL_ORDERED_ITEMS,
} from '../../Actions/ActionTypes';
const initialState = {
  tableNo: '',
};

const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEM_SELECTED:
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
    case CREATE_ORDER: {
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
    }
    case CLEAR_ALL_ORDERED_ITEMS: {
      return {
        ...state,
        [state.tableNo]: [],
      };
    }
    default:
      return state;
  }
};

export default foodReducer;
