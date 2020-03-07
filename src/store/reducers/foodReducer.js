import {
  ITEM_SELECTED,
  DELETE_ORDERED_ITEM,
  CREATE_ORDER,
  CLEAR_ALL_ORDERED_ITEMS,
  EDIT_ORDERED_ITEM,
  SET_CURRENT_TABLE_NO,
  PAYMENT_DONE,
} from '../../Actions/ActionTypes';
const initialState = {
  tableNo: '',
  pendingBills: [],
  billNo: 0,
  // waiterCode: 123,
  // CashierCode: 456,
};

const findItemInOrder = (state, item) => {
  // console.log('state from reducer ...', state);
  return state[state.tableNo]?.findIndex(
    element => element.itemCode === item.itemCode,
  );
};

const findBill = state => {
  // console.log('state from reducer ...', state);
  return state.pendingBills.findIndex(
    element => element.tableNo === state.tableNo,
  );
};

const findNextPendingBillTableNo = pendingBills => {
  // console.log('state.pendingBills.....', pendingBills);
  const indexVal = pendingBills.findIndex(
    element => element.paymentStatus === '',
  );
  let tableNo = '';
  // console.log('indexVal ....', indexVal);
  if (indexVal !== undefined && indexVal !== -1) {
    tableNo = pendingBills[indexVal]?.tableNo;
  }
  return tableNo;
};

const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEM_SELECTED:
      const itemIndex = findItemInOrder(state, action.selectedItem);

      // console.log('item index.....', itemIndex);

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
          pendingBills: [
            ...state.pendingBills,
            {
              tableNo: action.tableNo,
              waiterName: '', //action.serverName,
              waiterCode: action.waiterCode,
              cashierName: '',
              cashierCode: '',
              paymentStatus: '',
              paymentType: '',
              discount: '',
              amountPaid: '',
              totalAmount: '',
              paymentDate: '',
            },
          ],
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
      const editedItemIndex = findItemInOrder(state, action.editedOrderedItem);

      // console.log('edited item index.....', itemIndex);

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
    case SET_CURRENT_TABLE_NO:
      return {
        ...state,
        tableNo: action.tableNo,
      };
    case PAYMENT_DONE:
      let billItemIndex = findBill(state);
      let pendingBills = [...state.pendingBills];
      let billItem = pendingBills[billItemIndex];
      billItem = {...billItem, ...action.payment};
      pendingBills[billItemIndex] = {...billItem};
      const tableNo = findNextPendingBillTableNo(pendingBills);
      // console.log('Next pending bill table no ....', tableNo);
      return {
        ...state,
        pendingBills: [...pendingBills],
        tableNo: tableNo,
      };
    default:
      return state;
  }
};

export default foodReducer;
