import React, {Component} from 'react'
import {NavBar, Icon, InputItem, TextareaItem, Button, WhiteSpace} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'

class BossInfo extends Component {
  constructor(props) {
    super(props)
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
      {key: 'title', val: '招聘职位'},
      {key: 'company', val: '公司名称'},
      {key: 'money', val: '职位待遇'},
    ]
    return (
      <div>
        <NavBar mode="dark">Boos信息完善页</NavBar>
        <AvatarSelector selectAvatar={(imgname)=>{
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
        <TextareaItem title="职位要求"
                      placeholder="请填写职位要求"
                      rows='3'
                      data-seed="logId"
                      onChange={v => this.handleChange('desc', v)}/>
        <WhiteSpace/>
        <Button type='primary'>保存</Button>
      </div>
    )
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }
}

export default BossInfo