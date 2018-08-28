import { compose } from 'recompose';
import withRunActionDidMount from './withRunActionDidMount';

export const getProcessedActions = (actions, props) =>
  actions
    .map(action => (typeof action === 'function' ? action(props) : action))
    .filter(Boolean);

const withAsyncRequest = (beginActions, endActions) =>
  compose(withRunActionDidMount(beginActions, endActions));

export { withAsyncRequest };
