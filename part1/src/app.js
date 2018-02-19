import React from 'react';
import ReactDOM from 'react-dom';
import {PropTypes} from 'prop-types';
import '../styles/site';
import socketClient from 'socket.io-client';
//import { prototype } from '../../../../../../.cache/typescript/2.6/node_modules/@types/tapable';
import LoginPage from './components/LoginPage/LoginPage';
//import Banner from './components/Banner/Banner';
import ChatWindow from './components/ChatWindow/ChatWindow';



class App extends React.Component {

    constructor(props,ctx) {
        super(props,ctx);
    }
    getChildContext() {
        return{
            socket: socketClient('http://localhost:8080'),
            currentUser: ''
        };
    }
    getMainBody() {
        console.log(this.context);
        if(this.currentUser === '') {
            return (
                <LoginPage/>
            );
        }
        else {
            return (
                <ChatWindow/>
            );
        }
    }
    render() {
        return (
            <div className="hobo">
                
                {this.getMainBody()}
            </div>
        );
    }
};
App.childContextTypes = {
    socket: PropTypes.object.isRequired,
    currentUser : PropTypes.string
};


ReactDOM.render(<App />, document.getElementById('app'));
