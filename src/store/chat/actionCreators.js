import * as constants from './constants'
import axios from 'axios'
import io from 'socket.io-client';
import {actionCreators} from "./index";

const socket = io('ws://localhost:3030')
const msgList = (msgs, users, userid) => {
  return {type: constants.MSG_LIST, payload: {msgs, users, userid}}
}

const msgRecv = (msgs, userid) => {
  return {type: constants.MSG_RECV, payload: msgs, userid}
}

const msgRead = ({from, userid, num}) => {
  return {type: constants.MSG_READ, payload: {from, userid, num}}
}

// 发送消息
export function sendMsg({from, to, msg}) {
  return dispatch => {
    socket.emit('sendmsg', {from, to, msg})
  }
}

// 获取消息
export function recvMsg(userid) {
  return (dispatch) => {
    socket.on('recvmsg', data => {
      dispatch(msgRecv({data, userid}))
      dispatch(getMsgList(userid))
    })
  }
}

// 读取消息
export function readMsg(from) {
  return (dispatch, getState) => {
    axios.post('/user/readmsg', {from})
      .then(res => {
        const userid = getState().user._id
        const num = res.data.num
        if (res.data.code === 0) {
          dispatch(msgRead({userid, from, num}))
        }
      })
  }
}

//获取聊天列表
export function getMsgList(userid) {
  return (dispathch,getState) => {
    // console.log(getState().toJS())
    axios.get('/user/getmsglist')
      .then(res => {
        if (res.data.code === 0) {
          dispathch(msgList(res.data.msgs, res.data.users, userid))
        }
      })
  }
}