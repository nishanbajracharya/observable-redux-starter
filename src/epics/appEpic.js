import { Observable } from 'rxjs/Observable';

import * as appActions from '../actions/appActions';

export const fetchappEpic = (action$, store, { appService }) =>
  action$
    .ofType(appActions.FETCH_APP_NAME)
    .mergeMap(() =>
      appService
        .fetchAppName()
        .map(app => appActions.storeAppName(app.name))
        .catch(err => Observable.of(console.error(err)))
    );

export default fetchappEpic;
