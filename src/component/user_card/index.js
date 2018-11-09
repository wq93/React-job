import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
class UserCard extends Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(v) {
    const chat = `/chat/${v._id}`
    this.props.history.push(chat)
  }

  render() {
    const Header = Card.Header
    const Body = Card.Body
    return (
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {this.props.userlist.map(v => (
          v.avatar ? (
            <React.Fragment key={v._id}>
              <Card
                onClick={() => this.handleChange(v)}>
                <Header
                  title={v.user}
                  thumb={require(`../../common/img/${v.avatar}.png`)}
                  extra={<span>{v.title}</span>}
                ></Header>
                <Body>
                {v.type === 'boss' ? <div>公司:{v.company}</div> : null}

                {v.desc.split('\n').map(d => (
                  <div key={d}>{d}</div>
                ))}
                {v.type === 'boss' ? <div>薪资:{v.money}</div> : null}
                </Body>
              </Card>
              <WhiteSpace></WhiteSpace>
            </React.Fragment>) : null

        ))}
      </WingBlank>
    )
  }
}

export default UserCard