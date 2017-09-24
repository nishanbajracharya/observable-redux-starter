import http from '../utils/http';

export const fetchQuote = () =>
  http.get(
    'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1'
  );
