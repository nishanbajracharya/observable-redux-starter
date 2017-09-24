import http from '../utils/http';

export const fetchQuote = () =>
  http.get(
    'https://random-quote-generator.herokuapp.com/api/quotes/random'
  );
