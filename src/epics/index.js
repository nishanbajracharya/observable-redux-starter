import { combineEpics } from 'redux-observable';

import quoteEpic from './quoteEpic';

export default combineEpics(quoteEpic);
