import { put, all, takeEvery } from 'redux-saga/effects';
import { push, replace as replaceUrl } from 'react-router-redux';
import { delay } from 'redux-saga';
import { UNAUTHORIZED, REDIRECT } from 'reduxConstants';
import { onRedirect } from 'actions/common';

export function* sagaUnauthRedirect() {
  yield put(onRedirect('/login'));
}

export function* sagaRedirectFork(action) {
  const { payload } = action;
  const { redirectUrl, redirectDelay = 0, replace = false } = payload;
  yield delay(Number(redirectDelay));
  if (replace) {
    yield put(push(redirectUrl));
  } else {
    yield put(replaceUrl(redirectUrl));
  }
}

export default function* mainSaga() {
  yield all([takeEvery(UNAUTHORIZED, sagaUnauthRedirect)]);
  yield all([takeEvery(REDIRECT, sagaRedirectFork)]);
}
