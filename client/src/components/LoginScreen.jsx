import React from 'react';

import axios from 'axios';

class LoginScreen extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			textInput: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleNewUser = this.handleNewUser.bind(this);
		this.handleLogIn = this.handleLogIn.bind(this);
	}
	handleChange(e) {
		this.setState({
			textInput: e.target.value
		})
	}
	handleNewUser() {
		this.props.logIn(null, true);
	}
	handleLogIn() {
		this.setState({
			textInput: ''
		})
		axios.get(`http://localhost:1337/login/${this.state.textInput}`)
		.then(res => {
			console.log(res.body)
		})
		.catch(err => {
			console.log('GET ERROR:\n', err)
		})
	}
	render() {
		return (
			<div id='startScreen'>
				<input type='text' value={this.state.textValue}/>
				<div id='loginForm' onClick={this.handleLogIn}>
					Log In
				</div>
				<div id='newUserForm'>
					Create New User
				</div>
			</div>
		)
	}
}

export default LoginScreen;