import { all, takeLatest, put, take, race } from 'redux-saga/effects';
import { APP_NAME, ENTITIES } from 'appConstants';
import { ENTITY_LOAD_SUCCESS, ENTITY_LOAD_ERROR } from 'reduxConstants';
import { onRedirect } from 'actions/common';
import { onLoadEntity } from 'actions/entity';
import { actionCreator } from './utils';

/**
 * Constants
 * */

export const moduleName = 'loginForm';
const prefix = `${APP_NAME}/${moduleName}`;

export const ON_SUBMIT = `${prefix}/ON_SUBMIT_LOGIN_FORM`;

/**
 * Selectors
 * */

/**
 * Action Creators
 * */

export const onSubmitAction = actionCreator(ON_SUBMIT);

/**
 * Sagas
 * */
export function* sagaSendForm(action) {
  const {
    payload: { form },
  } = action;

  yield put(
    onLoadEntity({
      entityAlias: ENTITIES.USER,
      url: '/user/login',
      method: 'POST',
      data: form,
    }),
  );
  const result = yield race({
    success: take(ENTITY_LOAD_SUCCESS),
    error: take(ENTITY_LOAD_ERROR),
  });
  if (result.success) {
    yield put(onRedirect('/welcome'));
  }
}

export default function* mainSaga() {
  yield all([takeLatest(onSubmitAction.type, sagaSendForm)]);
}
