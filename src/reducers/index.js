import { combineReducers } from 'redux';
import { ENTITIES } from '../reduxConstants';
import reducerEntities from './entities';

const reducerMain = combineReducers({
  [ENTITIES]: reducerEntities,
});

export default reducerMain;
