"use strict";
//基本组件

import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../pages/App'

const rootEl = document.getElementById('app');
const render = Component =>
  ReactDOM.render(
    <AppContainer>
      	<Component />
    </AppContainer>,
    rootEl
  );

render(App);
if (module.hot) module.hot.accept('../pages/App', () => render(App));

