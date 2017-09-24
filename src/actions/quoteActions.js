export const FETCH_QUOTE = 'FETCH_QUOTE';
export const STORE_QUOTE = 'STORE_QUOTE';

export const fetchQuote = () => {
  return {
    type: FETCH_QUOTE,
  };
};

export const storeQuote = (quote = []) => {
  return {
    type: STORE_QUOTE,
    payload: { quote },
  };
};
