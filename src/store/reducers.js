// 合并小的reducer
import {combineReducers} from 'redux-immutable'; // 提供的是immutable数据
import {reducer as userReducer} from './user'

const reducer = combineReducers({
  user: userReducer
});

export default reducer;