import {
  ENTITY_DELETE,
  ENTITY_LOAD,
  ENTITY_CREATE,
  ENTITY_UPDATE,
  ENTITY_LOAD_SUCCESS,
} from '../reduxConstants';

export const onCreateEntity = ({ entityAlias, ...otherPayload }) => ({
  type: ENTITY_CREATE,
  payload: {
    entityAlias,
    ...otherPayload,
  },
});

export const onUpdateEntity = ({ entityAlias, ...otherPayload }) => ({
  type: ENTITY_UPDATE,
  payload: {
    entityAlias,
    ...otherPayload,
  },
});

export const onDeleteEntity = ({ entityAlias, ...otherPayload }) => ({
  type: ENTITY_DELETE,
  payload: {
    entityAlias,
    ...otherPayload,
  },
});
export const onLoadEntitySuccess = ({ entityAlias, ...otherPayload }) => ({
  type: ENTITY_LOAD_SUCCESS,
  payload: {
    entityAlias,
    ...otherPayload,
  },
});

export const onLoadEntity = ({
  entityAlias,
  url,
  method = 'GET',
  data = {},
  apiConfig,
  ...otherPayload
}) => ({
  type: ENTITY_LOAD,
  callAPI: true,
  payload: {
    entityAlias,
    apiConfig: {
      url,
      method,
      data,
      ...apiConfig,
    },
    ...otherPayload,
  },
});
