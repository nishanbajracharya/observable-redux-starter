import { logger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import epic from './epics';
import reducer from './reducers';
import * as quoteService from './services/quoteService';

const initialStore = {};

const epicMiddleware = createEpicMiddleware(epic, {
  dependencies: {
    quoteService,
  },
});

const middlewares = [epicMiddleware, logger];

const store = createStore(
  reducer,
  initialStore,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
