import {takeEvery} from 'redux-saga/effects';

function* handleLoadFoods() {}

export function* watchFoodSaga() {
  yield takeEvery('LOAD_FOODS', handleLoadFoods);
}
