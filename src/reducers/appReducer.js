import * as appActions from '../actions/appActions';

export const appReducer = (state = {}, { type = undefined, payload }) => {
  switch (type) {
    case appActions.STORE_APP_NAME:
      return {
        name: payload.name,
      };
    default:
      return state;
  }
};

export default appReducer;
