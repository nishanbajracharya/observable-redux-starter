import * as quoteActions from '../actions/quoteActions';

export const quoteReducer = (state = {}, { type = undefined, payload }) => {
  switch (type) {
  case quoteActions.STORE_QUOTE:
    return { title: payload.quote.quote, author: payload.quote.author };
  default:
    return state;
  }
};

export default quoteReducer;
