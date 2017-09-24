import { logger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import epic from './epics';
import reducer from './reducers';
import * as appService from './services/appService';

const initialStore = {};

const epicMiddleware = createEpicMiddleware(epic, {
  dependencies: {
    appService,
  },
});

const middlewares = [epicMiddleware, logger];

const store = createStore(
  reducer,
  initialStore,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
