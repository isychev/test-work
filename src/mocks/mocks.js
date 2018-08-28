let successSubmit = false;
let user = null;
const profileMock = mockAdapter => {
  mockAdapter.onGet('/user/current').reply(() => {
    if (successSubmit && user) {
      return [200, user];
    }
    return [401, {}];
  });
  mockAdapter.onPost('/user/login').reply(config => {
    user = JSON.parse(config.data);
    successSubmit = true;
    return [200, {}];
  });
  mockAdapter.onPost('/user/logout').reply(() => [200, {}]);
};

export default profileMock;
