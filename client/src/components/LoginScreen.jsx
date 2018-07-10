import React from 'react';

import axios from 'axios';

class LoginScreen extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			textInput: '',
			message: ''
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
		axios.post(`http://localhost:1337/login/createuser/${this.state.textInput}`)
		.then(res => {
			if(res.data === 'ALREADY THERE') {
				this.setState({
					textInput: '',
					message: 'Username already exists'
				})
			} else {	
				this.props.logIn({userName: this.state.textInput}, true);
			}
		})
	}
	handleLogIn() {
		this.setState({
			textInput: ''
		})
		axios.get(`http://localhost:1337/login/${this.state.textInput}`)
		.then(res => {
			console.log(res.data)
			if (res.data.length === 0) {
				this.setState({
					message: 'Username not found',
					textInput: ''
				})
			} else {
				this.props.logIn(res.data, false)
			}
		})
		.catch(err => {
			console.log('GET ERROR:\n', err)
		})
	}
	render() {
		return (
			<div id='startScreen'>
				<input type='text' value={this.state.textInput} onChange={this.handleChange} />
				{this.state.message !== '' &&	
					<div id='loginMessage'>
						{this.state.message}
					</div>
				}
				<div id='loginForm' onClick={this.handleLogIn} >
					Log In  {this.state.notFound && 'USER NOT FOUND'}  
				</div>
				<div id='newUserForm' onClick={this.handleNewUser} >
					Create New User {this.state.alreadyThere && 'USERNAME TAKEN'}
				</div>
			</div>
		)
	}
}

export default LoginScreen;