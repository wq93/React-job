import React, {Component} from 'react'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import QueueAnim from 'rc-queue-anim';
import {actionCreators} from '../../store/chat'
import {getChatId} from '../../common/js/util'

const mapStateToProps = state => (
  {
    _id: state.getIn(['user', '_id']),
    chatmsg: state.getIn(['chat', 'chatmsg']),
    users: state.getIn(['chat', 'users']),
  }
)

const mapDispatchToProps = (dispatch) => ({
  sendmsg(msg) {
    dispatch(actionCreators.sendMsg(msg))
  },
  recvMsg(userid) {
    dispatch(actionCreators.recvMsg(userid))
  },
  getMsgList(userid) {
    dispatch(actionCreators.getMsgList(userid))
  }
})

@connect(mapStateToProps, mapDispatchToProps)
class Chat extends Component {
  constructor(props) {
    super(props)
    const {user} = this.props.match.params
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      user,
      text: '',
      msg: [],
      showEmoji: false // 显示表情
    }
  }

  componentDidMount() {
    if (!this.props.chatmsg.length) {
      this.props.getMsgList(this.props._id)
      this.props.recvMsg(this.props._id)
    }
  }

  handleSubmit() {
    const msg = this.state.text
    const to = this.props.match.params.user
    const from = this.props._id
    this.props.sendmsg({msg, to, from})
    this.setState({text: ''})
  }

  render() {
    const userid = this.props.match.params.user
    const {_id, chatmsg, users} = this.props
    const chatid = getChatId(userid, _id)     // 拼接的id
    const chatmsgs = chatmsg.filter(v => v.chatid === chatid)     // 过滤msg
    const {Item} = List

    return (
      <div id='chat-page'>
        <NavBar mode='dark'
                icon={<Icon type="left"/>}
                onLeftClick={() => {
                  this.props.history.goBack()
                }}>
          {users[userid] && users[userid].name}
        </NavBar>
        <QueueAnim delay={100}>
          {chatmsgs.map(v => {
            const avatar = require(`../../common/img/${users[v.from].avatar}.png`)
            return v.from === userid ? (
              <List key={v._id}>
                <Item thumb={avatar}>
                  {v.content}
                </Item>
              </List>
            ) : (
              <List key={v._id}>
                <Item
                  extra={<img src={avatar} alt={avatar}/>}
                  className='chat-me'>
                  {v.content}
                </Item>
              </List>
            )
          })}
        </QueueAnim>
        <div className='stick-footer'>
          <InputItem
            placeholder='请输入'
            value={this.state.text}
            onChange={v => {
              const text = v
              this.setState({text})
            }}
            extra={
              <span onClick={() => {
                this.handleSubmit()
              }}>发送</span>
            }></InputItem>
        </div>
      </div>
    )
  }
}

export default Chat