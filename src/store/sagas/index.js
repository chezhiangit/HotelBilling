import {all, fork} from 'redux-saga/effects';

import {watchFoodSaga} from './foodSaga';

export function* rootSaga() {
  yield all([fork(watchFoodSaga)]);
}
