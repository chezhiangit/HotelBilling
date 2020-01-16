import {combineReducers} from 'redux';

import foodReducer from './foodReducer';

const rootReducer = combineReducers({
  food: foodReducer,
});

export default rootReducer;
