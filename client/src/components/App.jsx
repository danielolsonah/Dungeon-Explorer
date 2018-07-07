import React from 'react';

class App extends React.Component{
	constructor() {
		super();
		this.state = {
			inputText: '',
			display: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	handleChange(e) {
		this.setState({
			inputText: e.target.value
		})
	}
	handleClick() {
		if (this.state.inputText === "win") {
			this.setState({
				display: 'You Win!'
			})
		} else {
			this.setState({
				display: 'You Lose...'
			})
		}
	}
	render() {
		return (
			<div id='main'>
				<div id='display'>
					<h1>{this.state.display}</h1>
				</div>
				<div id='inputField'>
					<input id='textField' type='text' onChange={this.handleChange} />
					<button id='commandButton' onClick={this.handleClick}>GO</button>
				</div>
			</div>
		)
	}
}

export default App