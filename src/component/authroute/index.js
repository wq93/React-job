import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

@withRouter
class Index extends React.Component {
  componentDidMount() {
    // 是否登录或注册
    // 现在的url地址  login是不需要跳转的

    // 用户的type 身份是boss还是牛人
    // 用户是否完善信息（选择头像 个人简介）

    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (~publicList.indexOf(pathname)) return false
    // 获取用户信息
    axios.get('/user/info')
      .then(res => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            // 有登录信息de
            console.log(this.props.history)
          } else {
            this.props.history.push('/login') // 跳转到登录页
          }
        }
      })
  }

  render() {
    return null
  }
}

export default Index