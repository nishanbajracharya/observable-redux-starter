export const FETCH_APP_NAME = 'FETCH_APP_NAME';
export const STORE_APP_NAME = 'STORE_APP_NAME';

export const fetchAppName = () => {
  return {
    type: FETCH_APP_NAME,
  };
};

export const storeAppName = (name = '') => {
  return {
    type: STORE_APP_NAME,
    payload: { name },
  };
};
