import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import Logo from '../../component/logo/logo'
import {actionCreators} from '../../store/user'
import userForm from '../../component/hoc/form'

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

@userForm
@connect(mapStateToProps, mapDispathToProps)
class Register extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.handleChange('type', 'genius')
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
                this.props.handleChange('user', v)
              }}>用户名</InputItem>
            <WhiteSpace/>
            <InputItem type='password'
                       onChange={v => {
                         this.props.handleChange('pwd', v)
                       }}>密码</InputItem>
            <WhiteSpace/>
            <InputItem type='password'
                       onChange={v => {
                         this.props.handleChange('repeatpwd', v)
                       }}>确认密码</InputItem>
            <WhiteSpace/>
            {typeList.map(item => (
              <React.Fragment key={item.key}>
                <RadioItem checked={this.props.state.type === item.key}
                           onChange={() => {
                             this.props.handleChange('type', item.key)
                           }}>{item.val}
                </RadioItem>
                <WhiteSpace/>
              </React.Fragment>
            ))}
          </List>
          <Button type='primary'
                  onClick={() => {
                    this.props.register(this.props.state)
                  }}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register