import React, {Component} from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {actionCreators} from "../../store/user";

const mapStateToProps = (state) => ({
  isAuth: state.getIn(['user', 'isAuth']),
  msg: state.getIn(['user', 'msg']),
  user: state.getIn(['user', 'user']),
})
const mapDispathToProps = (dispatch) => {
  return {
    login(info) {
      dispatch(actionCreators.login(info))
    },
  }
}

@withRouter
@connect(mapStateToProps,mapDispathToProps)
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  render() {
    return (
      <div>
        <Logo></Logo>
        <h2>注册页面</h2>
        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : ''}
        <WingBlank>
          <List>
            <InputItem onChange={(v) => {
              this.handleChange('user', v)
            }}>用户名</InputItem>
            <WhiteSpace/>
            <InputItem type="password"
                       onChange={(v) => {
                         this.handleChange('pwd', v)
                       }}>密码</InputItem>
            <WhiteSpace/>
          </List>
          <Button type='primary'
                  onClick={() => {
                    this.props.login(this.state)
                  }}>登录</Button>
          <WhiteSpace/>
          <Button type='primary'
                  onClick={() => {
                    this.props.history.push('/register')
                  }}>注册</Button>
        </WingBlank>
      </div>
    )
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }
}

export default Login