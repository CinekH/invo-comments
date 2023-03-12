import React from 'react';
import { HomePage } from "@modules";

import { Provider } from 'react-redux';
import store from './modules/HomeModule/stores/store';

const App: React.FC = () => {
  return (
    <>
      <HomePage />
    </>
  )
};

const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default AppWrapper;
