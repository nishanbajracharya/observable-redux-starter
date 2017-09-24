import { Observable } from 'rxjs/Observable';

import * as quoteActions from '../actions/quoteActions';

export const fetchQuoteEpic = (action$, store, { quoteService }) =>
  action$
    .ofType(quoteActions.FETCH_QUOTE)
    .mergeMap(() =>
      quoteService
        .fetchQuote()
        .map(quote => quoteActions.storeQuote(quote))
        .catch(err => Observable.of(console.error(err)))
    );

export default fetchQuoteEpic;
