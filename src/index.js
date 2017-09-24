import 'react-hot-loader/patch';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import './style';
import './config/rxjs';
import App from './app';
import store from './store';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('app-container')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./app.js', () => {
    const RootContainer = require('./app').default;
    render(RootContainer);
  });
}
