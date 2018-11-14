import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import store from './store' // 合并的大reducer
import './common/js/config' // axios拦截器
import './common/css/index.css'
import 'antd-mobile/dist/antd-mobile.css';
import {Button} from 'antd-mobile';
import Login from './Container/login'
import Register from './Container/register'
import BossInfo from './Container/boss_info'
import GeniusInfo from './Container/genius_info'
import AuthRoute from './component/authroute'
import Dashboard from './component/dashboard'
import Chat from './component/chat'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <AuthRoute></AuthRoute>
          <Switch>
            <Route path='/bossinfo' component={BossInfo}></Route>
            <Route path='/geniusinfo' component={GeniusInfo}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/register' component={Register}></Route>
            <Route path='/chat/:user' component={Chat}></Route>
            <Route component={Dashboard}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
