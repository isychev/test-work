import { all } from 'redux-saga/effects';
import sagaAxios from './axios';
import sagaCommon from './common';

export default function* sagaMain() {
  yield all([sagaAxios(), sagaCommon()]);
}
