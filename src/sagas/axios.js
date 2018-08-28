import axios from 'axios';
import { put, call, take, race, fork } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { START, SUCCESS, ERROR } from 'reduxConstants';
import { onUnauthrized } from 'actions/common';
// temp

export const sendRequest = params => axios(params);

export function* sendRequestSaga(action) {
  const { payload } = action;
  yield put({ ...action, type: `${action.type}_${START}` });
  try {
    const response = yield call(sendRequest, payload.apiConfig);
    const { data, ...otherResponse } = response;
    yield put({
      ...action,
      payload: {
        ...payload,
        data,
        response: otherResponse,
      },
      type: `${action.type}_${SUCCESS}`,
    });
  } catch (error) {
    const errorResponse = error.response || {};
    if (errorResponse.status === 401) {
      yield put(onUnauthrized({ response: errorResponse }));
    }
    if (errorResponse.status === 500) {
      // console.log('500');
    }
    if (errorResponse.status === 404) {
      // console.log('Ошибка сервера. Страница не найдена');
    }
    yield put({
      ...action,
      type: `${action.type}_${ERROR}`,
      error,
    });
  }
}
// сага для асинхронных запросов
export default function* axiosSaga() {
  while (true) {
    const action = yield take('*');
    const { callAPI, ...rest } = action;
    if (callAPI) {
      yield race({
        request: fork(sendRequestSaga, rest),
        redirect: take(LOCATION_CHANGE),
      });
    }
  }
}
