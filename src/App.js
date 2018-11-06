import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {BrowserRouter, Route} from 'react-router-dom';
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            React app
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
