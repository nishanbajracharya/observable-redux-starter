import * as quoteActions from '../actions/quoteActions';

export const quoteReducer = (state = {}, { type = undefined, payload }) => {
  switch (type) {
  case quoteActions.STORE_QUOTE:
    return payload.quote[0];
  default:
    return state;
  }
};

export default quoteReducer;
