import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import * as quoteActions from './actions/quoteActions';

const App = ({ quote = {} }) => (
  <div className="quote">
    {quote.content && (
      <div
        dangerouslySetInnerHTML={{ __html: quote.content }}
        className="content"
      />
    )}
    {quote.title && <p className="title">{quote.title}</p>}
  </div>
);

App.propTypes = {
  quote: PropTypes.object,
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
