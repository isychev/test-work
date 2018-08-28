import {
  SEND_REQUEST,
  UNAUTHORIZED,
  AUTHORIZED,
  REDIRECT,
} from '../reduxConstants';

export const onUnauthrized = payload => ({
  type: UNAUTHORIZED,
  payload,
});

export const onAuthrized = payload => ({
  type: AUTHORIZED,
  payload,
});

export const onSendRequest = ({
  entityAlias,
  listAlias,
  formAlias,
  url,
  method = 'GET',
  data = {},
  apiConfig,
  ...otherPayload
}) => ({
  type: SEND_REQUEST,
  callAPI: true,
  payload: {
    entityAlias,
    listAlias,
    formAlias,
    apiConfig: {
      url,
      method,
      data,
      ...apiConfig,
    },
    ...otherPayload,
  },
});

export const onRedirect = params => {
  let payload = {};
  if (typeof params === 'string') {
    payload = {
      redirectUrl: params,
    };
  } else {
    const { redirectUrl, ...otherPayload } = params;
    payload = {
      redirectUrl,
      ...otherPayload,
    };
  }
  return {
    type: REDIRECT,
    payload,
  };
};
