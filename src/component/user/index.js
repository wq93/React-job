import React, {Component} from 'react'
import browserCookie from 'browser-cookies'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Modal} from 'antd-mobile';
import {actionCreators} from '../../store/user'

const mapStateToProps = (state) => ({
  redirectTo: state.getIn(['user', 'redirectTo']),
  user: state.getIn(['user', 'user']),
  avatar: state.getIn(['user', 'avatar']),
  company: state.getIn(['user', 'company']),
  type: state.getIn(['user', 'type']),
  title: state.getIn(['user', 'title']),
  desc: state.getIn(['user', 'desc']),
  money: state.getIn(['user', 'money']),
})
const mapDispatchToProps = dispatch => ({
  logoutSubmit() {
    dispatch(actionCreators.logoutSubmit())
  },
})

@connect(mapStateToProps, mapDispatchToProps)
class User extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout() {
    const {alert} = Modal
    alert('注销', '确认退出登录吗?', [
      {text: '取消', onPress: () => console.log('cancel')},
      {
        text: '确认', onPress: () => {
          localStorage.setItem('jobUser', '')
          browserCookie.erase('userid')
          this.props.logoutSubmit()
        }
      }
    ])
  }

  render() {
    const {user, avatar, redirectTo, company, type, title, desc, money} = this.props
    const {Item} = List
    const {Brief} = Item
    const myImg = src => (
      <img src={src} style={{width: 50}} alt=""/>
    )
    return user ?
      (<div className="userInfo">
          <Result
            img={myImg(require(`../../common/img/${avatar}.png`))}
            title={user}
            message={type === 'boss' ? company : null}
          />
          <List renderHeader={() => '简介'}>
            <Item
              multipleLine
            >
              {title}
              {desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
              {money ? <Brief>薪资:{money}</Brief> : null}
            </Item>
          </List>
          <WhiteSpace></WhiteSpace>
          <List>
            <Item onClick={this.logout}>退出登录</Item>
          </List>
        </div>
      ) : <Redirect to={redirectTo}/>
  }
}

export default User