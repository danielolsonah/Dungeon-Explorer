import React from 'react';
const rooms = require('../../../helperFunctions/rooms.js');
const helpers = require('../../../helperFunctions/helpers.js');
const villians = require('../../../helperFunctions/villians.js');

const commands = ['look around', 'search room', 'drink potion', 'go north', 'go west', 'go east', 'go south', 'commands']

class App extends React.Component{
	constructor() {
		super();
		this.state = {
			inputText: '',
			display: 'Welcome to Dungeon Explorer!  Click GO to get started...',
			location: rooms.firstRoom,
			alive: true,
			health: 100,
			enemyHealth: 0,
			gold: 0,
			attack: 0,
			inventory: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleKeypress = this.handleKeypress.bind(this);
		this.changeRoom = this.changeRoom.bind(this);
		this.displaySurroundings = this.displaySurroundings.bind(this);
		this.lose = this.lose.bind(this);
		this.doBattle = this.doBattle.bind(this);
		this.battleLoop = this.battleLoop.bind(this);
		this.winBattle = this.winBattle.bind(this);
	}
	handleChange(e) {
		this.setState({
			inputText: e.target.value
		})
	}
	lose() {
		this.setState({
			alive: false
		})
	}
	displaySurroundings() {
		this.setState({
			display: this.state.location.surroundings
		}, () => {
			if (this.state.location.instantDeath) {
				setTimeout(this.lose, 3000);
			}
		})
	}
	doBattle() {
		this.setState({
			display: `You encounter a ${villians[this.state.location.enemy].class}!  You engage in battle!!!`,
			enemyHealth: villians[this.state.location.enemy].health 
		}, () => {
			setTimeout(this.battleLoop, 4000);
		})
	}
	battleLoop() {
		var enemy = villians[this.state.location.enemy].class;
		var enemyAttack = villians[this.state.location.enemy].attack;
		if (this.state.enemyHealth <= 0) {
			this.winBattle();
		} else if (this.state.health <= 0) {
			this.setState({
				display: `You have been slain by the ${enemy}...`
			}, () => {
				this.setTimeout(this.lose, 2000)
			})
		} else {
			var randy = Math.floor(Math.random() * 100);
			if (randy > 90) {
				var damage = 30 + this.state.attack;
				this.setState({
					display: `A critical hit!  You clobber the ${enemy} for ${damage} damage!`,
					enemyHealth: this.state.enemyHealth - damage
				}, () => {
					setTimeout(this.battleLoop, 2500);
				})

			} else if (randy < 20) {
				this.setState({
					display: `You are struck by the ${enemy}!  You lose ${enemyAttack} health...`,
					health: this.state.health - enemyAttack
				}, () => {
					setTimeout(this.battleLoop, 2500);
				})
			} else {
				var damage = 15 + this.state.attack;
				this.setState({
					display: `You landed a hit on the ${enemy} for ${damage} damage!`,
					enemyHealth: this.state.enemyHealth - damage
				}, () => {
					setTimeout(this.battleLoop, 2500);
				})
			}
		}
	}
	winBattle() {
		var randy = Math.ceil(Math.random() * 20);
		this.setState({
			display: `You have deafeated the ${villians[this.state.location.enemy].class}!  You earned ${randy} gold!!`,
			gold: this.state.gold + randy
		})
	}
	changeRoom(direction) {
		if (this.state.location[direction] === 'win') {
			return 'YOU WIN!'
		} else if (this.state.location[direction]) {
			this.setState({
				location: rooms[this.state.location[direction]]
			}, () => {
				if (this.state.location.enemy) {
					setTimeout(this.doBattle, 1000)
				} else {
					setTimeout(this.displaySurroundings, 1000)
				}
			});
			return 'You go ' + direction + '...';
		} else {
			return 'You can\'t go that way!';
		}
	}
	searchRoom() {
		var item = this.state.location.item
		if (!item) {
			return `You do not find anything useful in this room`;
		} else if (item === 'potion') {
			this.setState({
				inventory: this.state.inventory.concat([item])
			});
			return `You found a Health Potion!  It has been added to your inventory.  Drink it to fully replenish your health!`;
		} else if (item === 'sword') {
			this.setState({
				attack: 15
			})
			return `You found a magic sword!  Your attack power has incresed!`
		}
	}
	takePotion() {
		var potionIndex = this.state.inventory.indexOf('potion')
		if (potionIndex === -1) {
			return `You do not have any potions.  SEARCH around for one...`;
		} else {
			this.setState({
				health: 100
			})
			return `You drink the mysterious potion and feel revitalized!`;
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
					break;
				case 'search room' :
					output = this.searchRoom();
					break;
				case 'drink potion' :
					output = this.takePotion();
					break;
				case '' :
					output = 'What do you do?';
					break;
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
				{this.state.alive ? 
					<div id='main' onKeyPress={this.handleKeypress}>
						<div id='display'>
							<h1>{this.state.display}</h1>
						</div>
						<div id='inputField'>
							<input id='textField' type='text' value={this.state.inputText} onChange={this.handleChange} />
							<button id='commandButton' onClick={this.handleClick}>GO</button>
						</div>
						<span id='healthDisplay'>
							Health: {this.state.health}
						</span>
						<span id='goldDisplay'>
							Gold: {this.state.gold}
						</span>
						{this.state.enemyHealth > 0 && <span id="enemyHealthDisplay">Enemy Health: {this.state.enemyHealth}</span>}
					</div> :
					<div id="loseScreen">
						GAME OVER 
						<br></br>
						Refresh page to try again
					</div>
				}
			</div>
		)
	}
}

export default App