import * as quoteActions from '../actions/quoteActions';

export const quoteReducer = (state = {}, { type = undefined, payload }) => {
  switch (type) {
  case quoteActions.STORE_QUOTE:
    return {
      title: payload.quote && payload.quote.quote,
      author: payload.quote && payload.quote.author,
    };
  default:
    return state;
  }
};

export default quoteReducer;
