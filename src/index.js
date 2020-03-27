import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from "fastclick";
import Route from "./router";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import store from "./store";
import * as serviceWorker from './serviceWorker';
import 'antd-mobile/dist/antd-mobile.css';
FastClick.attach(document.body);
const render = Component => {
    ReactDOM.render(
      <Provider store={store}>
        <AppContainer>
          <Component />
        </AppContainer>
      </Provider>,
      document.getElementById("root")
    );
  };
  
  render(Route);
  
  if (module.hot) {
    module.hot.accept("./router", () => {
      render(Route);
    });
  }

serviceWorker.unregister();
