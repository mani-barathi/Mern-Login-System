import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';

import StateProvider from "./contexts/StateContext"
import { intialState, reducer } from "./reducers/stateReducer"

ReactDOM.render(
  <React.StrictMode>
    <StateProvider intialState={intialState} reducer={reducer} >
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
