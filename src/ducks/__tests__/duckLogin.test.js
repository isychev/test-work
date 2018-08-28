import { takeLatest, all, put, race, take } from 'redux-saga/effects';
import mainSaga, { onSubmitAction, sagaSendForm } from '../duckLogin';
import { ENTITIES } from 'appConstants';
import { onLoadEntity } from 'actions/entity';
import { ENTITY_LOAD_ERROR, ENTITY_LOAD_SUCCESS } from 'reduxConstants';
import { onRedirect } from 'actions/common';

describe('test duckLogin', () => {
  it('should run saga sagaSendForm', () => {
    const saga = mainSaga();

    expect(saga.next().value).toEqual(
      all([takeLatest(onSubmitAction.type, sagaSendForm)]),
    );
    expect(saga.next().done).toEqual(true);
  });
  it('should sagaSendForm', () => {
    const action = {
      payload: {
        form: {},
      },
    };
    const saga = sagaSendForm(action);
    expect(saga.next().value).toEqual(
      put(
        onLoadEntity({
          entityAlias: ENTITIES.USER,
          url: '/user/login',
          method: 'POST',
          data: action.payload.form,
        }),
      ),
    );
    expect(saga.next().value).toEqual(
      race({
        success: take(ENTITY_LOAD_SUCCESS),
        error: take(ENTITY_LOAD_ERROR),
      }),
    );
    expect(saga.next({ success: true }).value).toEqual(
      put(onRedirect('/welcome')),
    );
  });
});
