import React, {Component} from 'react'

const userForm = (Component) => {
  return class WrapperComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.handleChange = this.handleChange.bind(this)
    }

    handleChange(key, val) {
      console.log(key, val)
      this.setState({
        [key]: val
      })
    }

    render() {
      return (
        <Component handleChange={this.handleChange}
                   state={this.state}
                   {...this.props}></Component>
      )
    }
  }
}
export default userForm