import React, {Component} from 'react'
import {NavBar} from 'antd-mobile'
import {connect} from 'react-redux'
import {withRouter, Switch, Route} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim';
import NavLinkBar from '../nav_link'
import Boss from '../boss'
import Genius from '../genius'
import Msg from '../msg'
import User from '../user'

const mapStateToProps = state => (
  {
    type: state.getIn(['user', 'type'])
  }
)
const mapDispatchToProps = dispatch => (
  {}
)

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {type} = this.props
    const pathname = this.props.location.pathname
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    // 让动画生效, 只渲染一个route,根据当前的path决定组件
    console.log(pathname)
    return (
      <div>
        <NavBar className='fixd-header' mode='dard'>
          {navList.find(v => v.path === pathname).title}
        </NavBar>
        <div className='dashboard-info'>
          <Switch>
            {
              navList.map(page => (<Route key={page.path} path={page.path} component={page.component}></Route>))
            }
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default Dashboard