import React from 'react';
import {PropTypes} from 'prop-types';

class RoomList extends React.Component {
    componentDidMount() {
        const { socket } = this.context;
        socket.emit('rooms');
        socket.on('roomlist',rooms => {
            this.setState({rooms:rooms});
            var roomList = [];
            for(var key in rooms) {
                roomList.push(key);
            }
            this.setState({roomKeys:roomList});
        });
        this.joinRoom('lobby');
        
    }

    constructor(props,ctx) {
        super(props,ctx);
        this.state={
            rooms:{},
            roomName: '',
            roomKeys:[]
        }
        
    }
    joinRoom(key) {
        const {socket} = this.context;
        var joinObj={
            room: key,
            pass: '' 
        };
        socket.emit('joinroom',joinObj,(accepted) => {
            if(accepted) {
                this.props.updateCurrentRoom(key);
                socket.emit('rooms');
            }

        })

    }
    createRoom(key) {
        const {socket} = this.context;
        var joinObj={
            room: key,
            pass: '' 
        };
        socket.emit('joinroom',joinObj,(accepted) => {
            if(accepted) {
                console.log('i have the grog');
                this.props.updateCurrentRoom(key);
                socket.emit('rooms');
            }
        })

    }
    render() {
        const {roomKeys, roomName} = this.state;


        return(
            <div className="RoomContainer">
                {roomKeys.map(m=>(<div className="RoomItem" key={m}>{m}
                    <button type="button" 
                    className ="btn pull-right" onClick={() => this.joinRoom(m)}>JoinRoom</button></div>))}
                <input 
                type="text" 
                className="roomName"
                value={roomName}
                onInput={(e) => this.setState({ roomName:e.target.value})}/>
                <button type="button" onClick={() => this.createRoom(roomName)}>CreateRoom</button>
            </div>
        );
    }
};
RoomList.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default RoomList;