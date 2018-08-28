import URLSearchParams from 'url-search-params';
import omit from 'lodash/omit';
import axios from 'axios';

import MockAdapter from 'axios-mock-adapter';
import { LOCATION_CHANGE } from 'react-router-redux';
import { call, take, fork, put, race } from 'redux-saga/effects';
import axiosSaga, { sendRequestSaga, sendRequest } from '../axios';
import { onUnauthrized } from 'actions/common';
import { START, SUCCESS, ERROR } from '../../reduxConstants';

global.URLSearchParams = URLSearchParams;

describe('test axios saga', () => {
  const simpleAction = {
    type: 'TEST',
    payload: {
      apiConfig: {
        url: '/test',
      },
    },
  };
  it('should call axios in sendRequest', async done => {
    const testResponse = {
      test: 'test',
    };
    const mock = new MockAdapter(axios);
    mock.onGet('/test').reply(200, testResponse);

    const response = await sendRequest({ url: '/test' });

    expect(response.data).toEqual(testResponse);
    done();
  });
  

  it('should call axios with success response', () => {
    const mock = new MockAdapter(axios);
    const responseSuccess = {
      users: [{ id: 1, name: 'John Smith' }],
    };
    mock.onGet('/test').reply(200, responseSuccess);

    const saga = sendRequestSaga(simpleAction);
    // should dispatch  TEST_START
    expect(saga.next().value).toEqual(
      put({ ...simpleAction, type: `${simpleAction.type}_${START}` }),
    );
    // should load data
    expect(saga.next().value).toEqual(
      call(sendRequest, simpleAction.payload.apiConfig),
    );
    // should dispatch TEST_SUCCESS
    expect(saga.next({ data: responseSuccess }).value).toEqual(
      put({
        ...simpleAction,
        type: `${simpleAction.type}_${SUCCESS}`,
        payload: {
          ...simpleAction.payload,
          data: responseSuccess,
          response: {},
        },
      }),
    );
    mock.reset();
  });

  it('should call axios with error 401', () => {
    const mock = new MockAdapter(axios);
    mock.onGet('/test').replyOnce(500);

    const saga = sendRequestSaga(simpleAction);

    expect(saga.next().value).toEqual(
      put({ ...simpleAction, type: `${simpleAction.type}_${START}` }),
    );
    // should load data
    expect(saga.next().value).toEqual(
      call(sendRequest, simpleAction.payload.apiConfig),
    );
    const errorResponse = {
      response: {
        status: 401,
      },
    };

    // should call catch
    expect(saga.throw(errorResponse).value).toEqual(
      put(
        onUnauthrized({
          response: errorResponse.response,
        }),
      ),
    );
    // should dispatch  TEST_ERROR
    expect(saga.next().value).toEqual(
      put({
        ...simpleAction,
        error: errorResponse,
        type: `${simpleAction.type}_${ERROR}`,
      }),
    );
    mock.reset();
  });
  
});
