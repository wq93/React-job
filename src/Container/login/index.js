import React, {Component} from 'react'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {actionCreators} from "../../store/user";
import Logo from '../../component/logo/logo'

const mapStateToProps = (state) => ({
  msg: state.getIn(['user', 'msg']),
  redirectTo: state.getIn(['user', 'redirectTo']),
})
const mapDispathToProps = (dispatch) => {
  return {
    login(info) {
      dispatch(actionCreators.login(info))
    },
  }
}

@withRouter
@connect(mapStateToProps, mapDispathToProps)
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
        {/*登录路由跳转*/}
        {(this.props.redirectTo && this.props.redirectTo !== '/login') ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo></Logo>
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