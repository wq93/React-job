import React, {Component} from 'react'
import browserCookie from 'browser-cookies'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {Modal, Button, WhiteSpace, WingBlank, Toast} from 'antd-mobile';
import {actionCreators} from '../../store/user'

const alert = Modal.alert;
const mapStateToProps = (state) => ({
  redirectTo: state.getIn(['user', 'redirectTo']),
  user: state.getIn(['user', 'user']),
})
const mapDispatchToProps = dispatch => ({
  logoutSubmit() {
    dispatch(actionCreators.logoutSubmit())
  },
})

@connect(mapStateToProps, mapDispatchToProps)
class User extends Component {

  render() {
    const {user, redirectTo} = this.props
    return user ?
      (<div>
          <Button
            onClick={() =>
              alert('退出登录', 'Are you sure???', [
                {text: 'Cancel', onPress: () => console.log('cancel')},
                {
                  text: 'Ok', onPress: () => {
                    localStorage.setItem('jobUser', '')
                    browserCookie.erase('userid')
                    this.props.logoutSubmit()
                  }
                },
              ])
            }
          >
            退出登录
          </Button>
        </div>
      ) : <Redirect to={redirectTo}/>
  }
}

export default User