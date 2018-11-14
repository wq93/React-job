// 合并小的reducer
import {combineReducers} from 'redux-immutable'; // 提供的是immutable数据
import {reducer as userReducer} from './user'
import {reducer as chatUserReducer} from './chat_user'
import {reducer as chatReducer} from './chat'

const reducer = combineReducers({
  user: userReducer,
  chatUser: chatUserReducer,
  chat: chatReducer
});

export default reducer;