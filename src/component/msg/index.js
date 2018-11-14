import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const mapStateToProps = state=>({
  _id: state.getIn(['user', '_id']),
  users: state.getIn(['chat', 'users']),
  chatmsg: state.getIn(['chat', 'chatmsg']),
})

@connect(mapStateToProps,null)
class Msg extends Component {
  getLaste(arr) { // 获取数组最后一项
    return arr[arr.length - 1]
  }
  render() {
    const {Item} = List
    const {Brief} = Item
    const userid = this.props._id // 当前用户id
    const users = this.props.users // 聊天用户
    const chatmsg = this.props.chatmsg
    const msgGroup = {} // 消息分组
    chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    // 提取对象的value并排序
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLaste(a).create_time
      const b_last = this.getLaste(b).create_time
      return b_last - a_last
    })


    return (
      <div>
        <List>
          {
            chatList.map(item =>{
              const lastItem = this.getLaste(item) // 数组最后一项
              const targetId = item[0].from === userid ? item[0].to : item[0].from // 当前用户id
              const name = users[targetId] && users[targetId].name // 当前用户名
              const unreadNum = item.filter(v => !v.read && v.to === userid).length // 过滤未读数量
              return(
                <Item
                  extra={<Badge text={unreadNum}></Badge>}
                  thumb={users[targetId].avatar ? require(`../../common/img/${users[targetId].avatar}.png`) : null}
                  key={lastItem._id}
                  arrow="horizontal"
                  onClick={() => {
                    this.props.history.push(`/chat/${targetId}`)
                  }}>
                  {lastItem.content}
                  <Brief>
                    {name}
                  </Brief>
                </Item>
              )
            })}
        </List>
      </div>
    )
  }
}

export default Msg