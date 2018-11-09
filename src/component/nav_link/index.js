import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

@withRouter
class NavLinkBar extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }

  render() {
    const {Item} = TabBar
    const navList = this.props.data.filter(v => {
      console.log(!v.hide)
      return !v.hide
    })
    const {pathname} = this.props.location
    return (
      <TabBar>
        {navList.map(v => (
          <Item key={v.path}
                title={v.text}
                icon={{uri: require(`../../common/img/${v.icon}.png`)}}
                selectedIcon={{uri: require(`../../common/img/${v.icon}-active.png`)}}
                selected={pathname === v.path}
                onPress={() => {
                  this.props.history.push(v.path)
                }}
          >

          </Item>
        ))}
      </TabBar>
    )
  }
}

export default NavLinkBar