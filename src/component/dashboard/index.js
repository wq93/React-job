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
import {actionCreators} from '../../store/chat'

const mapStateToProps = state => (
  {
    type: state.getIn(['user', 'type']),
    _id: state.getIn(['user', '_id']),
  }
)
const mapDispatchToProps = dispatch => (
  {
    sendmsg(msg) {
      dispatch(actionCreators.sendMsg(msg))
    },
    recvMsg(userid) {
      dispatch(actionCreators.recvMsg(userid))
    },
    getMsgList(userid) {
      dispatch(actionCreators.getMsgList(userid))
    }
  }
)

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getMsgList(this.props._id)
    this.props.recvMsg(this.props._id)
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
    const path = navList.find(v => v.path === pathname)
    return (
      <div>
        <NavBar className='fixd-header' mode='dard'>
          {navList.find(v => v.path === pathname).title}
        </NavBar>
        <div className='dashboard-info'>
          <QueueAnim type='scaleY' duration={450}>
            <Route key={path.path} path={path.path} component={path.component}></Route>
          </QueueAnim>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default Dashboard