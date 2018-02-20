import React from 'react';
import {PropTypes} from 'prop-types';

class RoomList extends React.Component {
    componentDidMount() {
        const { socket } = this.context;
        this.joinRoom('lobby'); 
        socket.emit('rooms');
        socket.on('roomlist',rooms => {
            this.setState({rooms:rooms});
            var roomList = [];
            for(var key in rooms) {
                roomList.push(key);
            }
            this.setState({roomKeys:roomList});
        });
        $('#lobby').addClass('selected');        
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
                this.props.updateCurrentRoom(key);
                socket.emit('rooms');
            }
        })
    }
    render() {
        const {roomKeys, roomName} = this.state;
        return(
            <div className="RoomContainer">
                {roomKeys.map(m=>(<div id={m} className="RoomItem" key={m}>
                    <p className="RoomItemName">{m}</p>
                    <button 
                        className="RoomItemButton btn"
                        type="button" 
                        onClick={() => this.joinRoom(m)}>Join Room</button></div>))
                }
                <input 
                    type="text" 
                    className="roomName"
                    placeholder="Enter room name..."
                    value={roomName}
                    onInput={(e) => this.setState({ roomName:e.target.value})}/>
                <button type="button" className="CreateRoomButton btn" onClick={() => this.createRoom(roomName)}>Create Room</button>
            </div>
        );
    }
};
RoomList.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default RoomList;