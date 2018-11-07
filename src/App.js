import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import store from './store'

import { Button } from 'antd-mobile';

const App = () =>{
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Button type="primary" size="small" inline>small</Button>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
