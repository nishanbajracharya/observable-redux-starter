import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import * as quoteActions from './actions/quoteActions';

const App = ({ quote = {}, fetchQuote = f => f }) => (
  <div className="quote">
    {quote.title && <p className="content">{quote.title}</p>}
    {quote.author && <p className="title">{quote.author}</p>}
    <button className="btn" onClick={() => fetchQuote()}>
      Another
    </button>
  </div>
);

App.propTypes = {
  quote: PropTypes.object,
  fetchQuote: PropTypes.func,
};

export default compose(
  connect(
    ({ quote }) => ({ quote }),
    dispatch => ({
      fetchQuote: () => dispatch(quoteActions.fetchQuote()),
    })
  ),
  lifecycle({
    componentDidMount() {
      this.props.fetchQuote();
    },
  })
)(App);
