"use strict";
//基本组件

import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App2 from '../pages/App2'

const rootEl = document.getElementById('app');
const render = Component =>
  ReactDOM.render(
    <AppContainer>
      	<Component />
    </AppContainer>,
    rootEl
  );

render(App2);
if (module.hot) module.hot.accept('../pages/App2', () => render(App2));

