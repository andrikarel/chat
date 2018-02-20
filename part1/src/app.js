import React from 'react';
import ReactDOM from 'react-dom';
import {PropTypes} from 'prop-types';
import '../styles/site';
import socketClient from 'socket.io-client';
import LoginPage from './components/LoginPage/LoginPage';
import Banner from './components/Banner/Banner';
import RoomList from './components/RoomList/RoomList';
import ChatWindow from './components/ChatWindow/ChatWindow';



class App extends React.Component {

    constructor(props,ctx) {
        super(props,ctx);
        const socket =  socketClient('http://localhost:8080');
        this._socket = socket;
        this.state = {
            currentUser: '',
            currentRoom: ''
        }
    }
    getChildContext() {
        return{
            socket: this._socket
        };
    }
    updateUser(user) {
        this.setState({currentUser: user})
    }
    updateCurrentRoom(room) {
        this.setState({currentRoom: room})
    }
    getMainBody() {
        if(this.state.currentUser === '') {
            return (
                <LoginPage updateUser={(x) => this.updateUser(x)}/>
            );
        }
        else {
            return (
                <div className='row'>
                    <div className='col-md-3'>
                        <RoomList 
                            currentUser={this.state.currentUser}
                            updateCurrentRoom={(x) => this.updateCurrentRoom(x)}
                            currentRoom = {this.state.currentRoom}/>
                    </div>
                    <div className='col-md-9'>
                        <ChatWindow
                            currentUser={this.state.currentUser}
                            updateCurrentRoom={(x) => this.updateCurrentRoom(x)}
                            currentRoom = {this.state.currentRoom}/>
                    </div>
                </div>
            );
        }
    }
    render() {
        return (
            <div>
                <Banner />
                <div>
                    {this.getMainBody()}
                </div>
            </div>
        );
    }
};
App.childContextTypes = {
    socket: PropTypes.object.isRequired,
};


ReactDOM.render(<App />, document.getElementById('app'));
