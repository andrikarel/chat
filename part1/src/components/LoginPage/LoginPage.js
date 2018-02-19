import React from 'react';
import {PropTypes} from 'prop-types';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            input: ''
        }
    }
    addUser() {
        const {socket, currentUser} = this.context;
        socket.emit('adduser',this.state.input,(nickAvailable) => {
            if(nickAvailable && currentUser !== '') {
                console.log('ITS AVAIALABLE');
                
            }
            else {
                console.log('SORRY NOT AVAILABLE');
            }
        });
    }
    render() {
        const {input} = this.state;
        return(
            <div className="login">
                <p>{input}</p>
                <div className="input-box">
                    <input type="text"
                    value={input}
                    className="input input-big" 
                    onInput={(e) => this.setState({ input:e.target.value})}/>
                    <button type="button" 
                    className ="btn pull-right"
                    onClick={() => this.addUser()}>Choose Nickname</button>
                </div>
            </div>
        );
    }
};
LoginPage.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default LoginPage;