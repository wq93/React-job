import React, {Component} from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
class Login extends Component {
  constructor(props) {
    super(props)
    this.handleClickLogin = this.handleClickLogin.bind(this)
    this.handleClickRegister = this.handleClickRegister.bind(this)
  }

  render() {
    return (
      <div>
        <Logo></Logo>
        <h2>注册页面</h2>
        <WingBlank>
          <List>
            <InputItem>用户名</InputItem>
            <WhiteSpace/>
            <InputItem type="password">密码</InputItem>
            <WhiteSpace/>
          </List>
          <Button type='primary' onClick={this.handleClickLogin}>登录</Button>
          <WhiteSpace/>
          <Button type='primary'
                  onClick={() => {
                    this.props.history.push('/register')
                  }}>注册</Button>
        </WingBlank>
      </div>
    )
  }

  handleClickLogin() {
    console.log('handlerClickLogin')
  }

  handleClickRegister() {
    console.log('handlerClickRegister')
  }
}

export default Login