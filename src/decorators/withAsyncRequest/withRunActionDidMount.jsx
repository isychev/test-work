import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getProcessedActions } from './withAsyncRequest';

const withRunActionDidMount = (
  beginActions = [],
  endActions = [],
) => Component =>
  class withRunActionDidMountHOC extends PureComponent {
    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      beginActions: PropTypes.arrayOf(PropTypes.any),
      endActions: PropTypes.arrayOf(PropTypes.any),
    };
    static defaultProps = {
      beginActions: [],
      endActions: [],
    };

    componentDidMount() {
      this.executeAction(
        beginActions.length ? beginActions : this.props.beginActions,
      );
    }

    componentWillUnmount() {
      this.executeAction(
        endActions.length ? endActions : this.props.endActions,
      );
    }

    executeAction = actions => {
      const processedActions = getProcessedActions(actions, this.props);
      processedActions.forEach(action => {
        this.props.dispatch(action);
      });
    };
    render() {
      return <Component {...this.props} />;
    }
  };

export default withRunActionDidMount;
