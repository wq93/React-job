import * as constants from './constants'

const defaultState = {
  userList: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.USER_LIST:
      return {...state, userList: action.payload}
    default:
      return state
  }
}