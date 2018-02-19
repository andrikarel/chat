import React from 'react';
import ReactDOM from 'react-dom';
import {PropTypes} from 'prop-types';
import '../styles/site';
import socketClient from 'socket.io-client';
//import { prototype } from '../../../../../../.cache/typescript/2.6/node_modules/@types/tapable';
import LoginPage from './components/LoginPage/LoginPage';
import Banner from './components/Banner/Banner';
import ChatWindow from './components/ChatWindow/ChatWindow';



class App extends React.Component {

    constructor(props,ctx) {
        super(props,ctx);
        this.state = {
            currentUser: ''
        }
    }
    getChildContext() {
        return{
            socket: socketClient('http://localhost:8080'),
        };
    }
    updateUser(user) {
        this.setState({currentUser: user})
    }
    getMainBody() {
        if(this.state.currentUser === '') {
            return (
                <LoginPage updateUser={(x) => this.updateUser(x)}/>
            );
        }
        else {
            return (
                <ChatWindow currentUser={this.state.currentUser}/>
            );
        }
    }
    render() {
        return (
            <div className="hobo">
                <Banner />
                <div className="container-centered">
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
