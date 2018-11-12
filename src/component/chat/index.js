import React, {Component} from 'react'
import io from 'socket.io-client';
const socket = io('ws://localhost:3030')

class Chat extends Component {
  componentDidMount() {
    console.log('1')
  }
  handleSubmit() {
    console.log('sendmsg')
    socket.emit('sendmsg','sendmsg')
  }
  render() {
    return (
      <div onClick={()=>{
        this.handleSubmit()
      }}>chat</div>
    )
  }
}

export default Chat