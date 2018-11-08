import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar, Icon, InputItem, TextareaItem, Button, WhiteSpace} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {actionCreators} from "../../store/user";

const mapStateToProps = (state) => ({
  _id: state.getIn(['user', '_id']),
  redirectTo: state.getIn(['user', 'redirectTo'])
})
const mapDispathToProps = (dispatch) => {
  return {
    update(info) {
      dispatch(actionCreators.update(info))
    },
  }
}

@connect(mapStateToProps, mapDispathToProps)
class Geniusinfo extends Component {
  constructor(props) {
    super(props)
    // 初始化状态
    this.state = {
      title: '',
      company: '',
      money: '',
      desc: '',
      avatar: '' // 头像
    }
    this.handleChange = this.handleChange.bind(this)
  }

  render() {
    const itemList = [
      {key: 'title', val: '求职岗位'}
    ]
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <NavBar mode="dark">牛人信息完善页</NavBar>
        <AvatarSelector selectAvatar={(imgname) => {
          this.setState({
            avatar: imgname
          })
        }}></AvatarSelector>
        <WhiteSpace/>
        {
          itemList.map(item => (
            <React.Fragment key={item.key}>
              <InputItem placeholder={`请填写${item.val}`}
                         onChange={v => this.handleChange(item.key, v)}>{item.val}</InputItem>
              <WhiteSpace/>
            </React.Fragment>
          ))
        }
        <TextareaItem
          onChange={(v) => this.handleChange('desc', v)}
          rows={3}
          autoHeight
          title='个人见解'
        >
        </TextareaItem>
        <WhiteSpace/>
        <Button type='primary'
                onClick={() => {
                  let userId = this.props._id
                  this.props.update(Object.assign(this.state, {userId}))
                }}>保存</Button>
      </div>
    )
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }
}

export default Geniusinfo