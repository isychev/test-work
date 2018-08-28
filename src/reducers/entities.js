import omit from 'lodash/omit';
import {
  ENTITY_CREATE,
  ENTITY_DELETE,
  ENTITY_UPDATE,
  ENTITY_LOAD_SUCCESS,
  FORM_LOAD_FORM_DATA_SUCCESS,
} from '../reduxConstants';

const reducerEntities = (state = {}, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ENTITY_DELETE: {
      const { entityAlias } = payload;
      return {
        ...omit(state, entityAlias),
      };
    }
    case ENTITY_UPDATE: {
      const { entityAlias, entity } = payload;
      return {
        ...state,
        [entityAlias]: {
          ...state[entityAlias],
          ...entity,
        },
      };
    }
    case ENTITY_CREATE: {
      const { entityAlias, entity } = payload;
      return {
        ...state,
        [entityAlias]: entity,
      };
    }
    case FORM_LOAD_FORM_DATA_SUCCESS:
    case ENTITY_LOAD_SUCCESS: {
      const { entityAlias, data } = payload;
      if (entityAlias) {
        return {
          ...state,
          [entityAlias]: data,
        };
      }
      return state;
    }

    default:
      return state;
  }
};

export default reducerEntities;
