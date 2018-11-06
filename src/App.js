import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {BrowserRouter, Route} from 'react-router-dom';
import store from './store'
import axios from 'axios'

class App extends Component {
  componentDidMount() {
    axios.get('/users')
      .then(res => {
        console.log(res)
      })
  }

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
