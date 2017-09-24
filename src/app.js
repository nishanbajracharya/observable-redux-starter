import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import * as appActions from './actions/appActions';

const App = ({ app = {} }) => <div>{app.name}</div>;

App.propTypes = {
  app: PropTypes.object,
};

export default compose(
  connect(
    ({ app }) => ({ app }),
    dispatch => ({
      storeAppName: () => dispatch(appActions.storeAppName()),
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.storeAppName();
    },
  })
)(App);
