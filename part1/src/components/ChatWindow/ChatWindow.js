import React from 'react';
import {PropTypes} from 'prop-types';

class ChatWindow extends React.Component {
    componentDidMount() {
        const { socket } = this.context;
        socket.on('updatechat', (roomName,messageHistory)=> {
            this.setState({messages: messageHistory});
        });
    }
    constructor(props,ctx) {
        super(props,ctx);
        this.state={
            msg: '',
            messages: [],
            rooms: []
        }
    }
    sendMessage() {
        const {socket} = this.context;
        var data ={
            roomName: this.props.currentRoom,
            msg: this.props.currentUser + ' says: '+ this.state.msg
        }
        socket.emit('sendmsg',data);
        this.setState({ msg: ''});
    }
    render() {
        const {messages,msg } = this.state;
        return(
            <div className="chat-window">
                <h1>You are in: {this.props.currentRoom}</h1>
                <p>Hello {this.props.currentUser}!</p>
                <div className='messageBox'>
                    {messages.map(m=>(<div key={m.nick + m.timestamp}>{m.message}</div>))}
                </div>
                <div className="input-box">
                    <input type="text"
                    value={msg}
                    className="input input-big" 
                    onInput={(e) => this.setState({ msg:e.target.value})}/>
                    <button type="button" 
                    className ="btn pull-right" onClick={() => this.sendMessage()}>Send</button>
                </div>
            </div>
        );
    }
};
ChatWindow.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default ChatWindow;