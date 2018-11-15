import * as constants from './constants'

const initState = {
  chatmsg: [],
  unread: 0,
  users: {}
}

export default (state = initState, action) => {
  switch (action.type) {
    case constants.MSG_LIST:
      return {
        ...state,
        users: action.payload.users,
        chatmsg: action.payload.msgs,
        unread: action.payload.msgs.filter(v => !v.read && action.payload.userid === v.to).length
      }
    case constants.MSG_RECV:
      const addNum = action.payload.to === action.userid ? 1 : 0;
      return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + addNum}
    case constants.MSG_READ:
      const {from, num} = action.payload
      return {
        ...state,
        // 当前谁发给我的消息
        // 修改read的状态
        chatmsg: state.chatmsg.map(v => ({...v, read: v.from === from ? true : v.read})),
        unread: state.unread - num
      }
    default:
      return state
  }
}