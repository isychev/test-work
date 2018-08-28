import { all, takeLatest, put, take, race } from 'redux-saga/effects';
import { APP_NAME } from 'appConstants';
import { SEND_REQUEST_SUCCESS, SEND_REQUEST_ERROR } from 'reduxConstants';
import { onSendRequest, onRedirect } from 'actions/common';
import { actionCreator } from './utils';

/**
 * Constants
 * */

export const moduleName = 'loginForm';
const prefix = `${APP_NAME}/${moduleName}`;

export const ON_LOGOUT = `${prefix}/ON_LOGOUT`;

/**
 * Selectors
 * */

/**
 * Action Creators
 * */

export const onLogout = actionCreator(ON_LOGOUT);

/**
 * Sagas
 * */

export function* sagaLogout() {
  yield put(
    onSendRequest({
      url: '/user/logout',
      method: 'POST',
    }),
  );
  const result = yield race({
    success: take(SEND_REQUEST_SUCCESS),
    error: take(SEND_REQUEST_ERROR),
  });
  if (result.success) {
    yield put(onRedirect('/login'));
  }
}

export default function* mainSaga() {
  yield all([takeLatest(onLogout.type, sagaLogout)]);
}
