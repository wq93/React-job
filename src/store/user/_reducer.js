import * as constants from './constants'
import {getRedirectPath} from '../../common/js/util'

const initState = {
  isAuth: false,
  msg: '',
  user: '',
  pwd: '',
  type: ''
}

const defaultState = (localStorage.getItem('jobUser') && JSON.parse(localStorage.getItem('jobUser'))) || initState


export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.AUTH_SUCCESS:
      localStorage.setItem('jobUser', JSON.stringify({
        ...state,
        msg: '',
        redirectTo: getRedirectPath(action.payload), ...action.payload
      }))
      return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload}
    case constants.LOAD_DATA:
      return {...state, ...action.payload}
    case constants.ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    case constants.LOGIN_OUT:
      return {redirectTo: '/login', ...initState}
    default:
      return state
  }
}