import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import Logo from '../../component/logo/logo'
import {actionCreators} from '../../store/user'

const mapStateToProps = (state) => ({
  msg: state.getIn(['user', 'msg']),
  user: state.getIn(['user', 'user']),
  redirectTo: state.getIn(['user', 'redirectTo']),
})

const mapDispathToProps = (dispatch) => {
  return {
    register(info) {
      dispatch(actionCreators.register(info))
    },
  }
}

@connect(mapStateToProps, mapDispathToProps)
class Register extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'genius' // 或者boss
    }
  }

  handleChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  render() {
    const {redirectTo, user} = this.props
    const RadioItem = Radio.RadioItem
    const typeList = [
      {
        key: 'genius',
        val: '牛人'
      }, {
        key: 'boss',
        val: 'Boss'
      }]
    return (
      <div>
        {redirectTo && user ? <Redirect to={redirectTo}/> : null}
        <Logo></Logo>
        <WingBlank>
          <List>
            {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : ''}
            <InputItem
              onChange={v => {
                this.handleChange('user', v)
              }}>用户名</InputItem>
            <WhiteSpace/>
            <InputItem type='password'
                       onChange={v => {
                         this.handleChange('pwd', v)
                       }}>密码</InputItem>
            <WhiteSpace/>
            <InputItem type='password'
                       onChange={v => {
                         this.handleChange('repeatpwd', v)
                       }}>确认密码</InputItem>
            <WhiteSpace/>
            {typeList.map(item => (
              <React.Fragment key={item.key}>
                <RadioItem checked={this.state.type === item.key}
                           onChange={() => {
                             this.handleChange('type', item.key)
                           }}>{item.val}
                </RadioItem>
                <WhiteSpace/>
              </React.Fragment>
            ))}
          </List>
          <Button type='primary'
                  onClick={() => {
                    this.props.register(this.state)
                  }}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register