import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as appActions from './actions/appActions';

const App = ({ app = {} }) => <div>{app.name}</div>;

App.propTypes = {
  app: PropTypes.object,
};

export default connect(
  ({ app }) => ({ app }),
  dispatch => ({
    storeAppName: () => dispatch(appActions.storeAppName()),
  })
)(App);
