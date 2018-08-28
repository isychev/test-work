import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mocks from './mocks';

const applyAxiosMocks = () => {
  const mockAdapter = new MockAdapter(axios);
  mocks(mockAdapter);
};

export default applyAxiosMocks;
