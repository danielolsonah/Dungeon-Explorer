import React from 'react';
const rooms = require('../../../helperFunctions/rooms.js');
const helpers = require('../../../helperFunctions/helpers.js')

const commands = ['look around', 'go north', 'go west', 'go east', 'go south', 'commands']

class App extends React.Component{
	constructor() {
		super();
		this.state = {
			inputText: '',
			display: 'Welcome to Dungeon Explorer!  Click GO to get started...',
			location: rooms.firstRoom
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleKeypress = this.handleKeypress.bind(this);
		this.changeRoom = this.changeRoom.bind(this);
	}
	handleChange(e) {
		this.setState({
			inputText: e.target.value
		})
	}
	changeRoom(direction) {
		if (this.state.location[direction] === 'win') {
			return 'YOU WIN!'
		}
		if (this.state.location[direction]) {
			this.setState({
				location: rooms[this.state.location[direction]]
			});
			return 'You go ' + direction;
		} else {
			return 'You can\'t go that way!';
		}
	}
	handleClick() {
		var input = this.state.inputText.toLowerCase();
		var output;
		if (!input) {
			output = 'What do you do?';
		} else {
			switch (input) {
				case 'look around': 
					output = this.state.location.surroundings;
					break;
				case 'win':
					output = 'You Win!';
					break;
				case 'go north' :
					output = this.changeRoom('north');
					break;
				case 'go east' :
					output = this.changeRoom('east');
					break;
				case 'go west' :
					output = this.changeRoom('west');
					break;
				case 'go south' :
					output = this.changeRoom('south');
					break;
				case 'commands' :
					output = commands.join(' ');
				case '' :
					output = 'What do you do?'
				default:
					output = 'Command not found.  Please Try Again'
			}
		}
		this.setState({
			display: output,
			inputText: ''
		})
	}
	handleKeypress(e) {
		console.log(e.key);
		if (e.key === 'Enter') {
			this.handleClick();
		}
	}
	render() {
		return (
			<div>
				<div id='leftPanel'>
					<h3>Command List</h3>
					<ul id="commandList">
						{commands.map(command => <li key={command} className='commandListEntry'>{command}</li>)}
					</ul>
				</div>
				<div id='main' onKeyPress={this.handleKeypress}>
					<div id='display'>
						<h1>{this.state.display}</h1>
					</div>
					<div id='inputField'>
						<input id='textField' type='text' value={this.state.inputText} onChange={this.handleChange} />
						<button id='commandButton' onClick={this.handleClick}>GO</button>
					</div>
				</div>
			</div>
		)
	}
}

export default App