import { logger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducers';

const initialStore = {};

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

const store = createStore(
  reducer,
  initialStore,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
