import React from 'react';
import Title from './Title.jsx';
import Input from './Input.jsx';
import Stats from './Stats.jsx';
import LoseScreen from './LoseScreen.jsx';
import DisplayScreen from './DisplayScreen.jsx';
import Log from './Log.jsx';
import CommandButtons from './CommandButtons.jsx';
import HealthBar from './HealthBar.jsx';
import BattleScreen from './BattleScreen.jsx';
import LoginScreen from './LoginScreen.jsx';
import axios from 'axios';
import $ from 'jquery';

const rooms = require('../../../helperFunctions/rooms.js');
const helpers = require('../../../helperFunctions/helpers.js');
const villians = require('../../../helperFunctions/villians.js');

class App extends React.Component{
	constructor() {
		super();
		this.state = {
			inputText: '',
			adventureLog: [],
			battleLog: [],
			display: 'Welcome to Dungeon Explorer!',
			location: 'firstRoom',
			alive: true,
			health: 100,
			loggingIn: true,
			gold: 0,
			attack: 10,
			inventory: [],
			inBattle: false,
			visitedRooms: [],
			lootedRooms: [],
			userName: ''
		};
		this.logIn = this.logIn.bind(this);
		this.changeRoom = this.changeRoom.bind(this);
		this.displaySurroundings = this.displaySurroundings.bind(this);
		this.lose = this.lose.bind(this);
		this.doBattle = this.doBattle.bind(this);
		this.winBattle = this.winBattle.bind(this);
		this.searchRoom = this.searchRoom.bind(this);
		this.takePotion = this.takePotion.bind(this);
		this.loseHealth = this.loseHealth.bind(this);
		this.addToBattleLog = this.addToBattleLog.bind(this);
		this.saveGame = this.saveGame.bind(this);
	}
	logIn(state, newUser) {
		if (!newUser) {
			this.setState(state[0])
		} else {
			this.setState({
				userName: state.userName
			})
		}
		this.setState({
			loggingIn: false
		})
	}
	saveGame() {
		axios.post(`${this.state.userName}/save`, this.state)
		.then(res => {
			console.log('SAVED')
		})
		.catch(err => {
			console.log('SaveError:\n', err)
		})
		// $.ajax({
		// 	method: 'POST',
		// 	url: `http://localhost:1337/${this.state.userName}/save`,
		// 	data: JSON.stringify(this.state),
		// 	contentType: 'application/json',
		// 	success: (data) => {
		// 		console.log('POSTED\n', data)
		// 	},
		// 	error: (err) => {
		// 		console.log('Post error', err)
		// 	}
		// })
	}
	lose() {
		this.setState({
			alive: false
		})
	}
	displaySurroundings() {
		var location = rooms[this.state.location]
		var log = location.surroundings
		this.setState({
			display: log,
			adventureLog: this.state.adventureLog.concat(log)
		}, () => {
			if (location.instantDeath) {
				setTimeout(this.lose, 3000);
			}
		})
	}
	loseHealth(number) {
		this.setState({
			health: this.state.health - number
		})
	}
	addToBattleLog(entry) {
		this.setState({
			battleLog: this.state.battleLog.concat(entry)
		})
	}
	doBattle() {
		var villian = villians[rooms[this.state.location].enemy]
		var log = `You are attacked by a ${villian.class}!  You engage in battle!!!`;
		this.setState({
			display: log,
			adventureLog: this.state.adventureLog.concat(log) 
		}, () => {
			setTimeout(() => this.setState({inBattle: true}), 2000);
		})
	}
	winBattle(log, goldDrop) {
		this.setState({
			display: log,
			adventureLog: this.state.adventureLog.concat(log),
			battleLog: [],
			gold: this.state.gold + goldDrop,
			inBattle: false
		})
	}
	changeRoom(direction) {
		var location = rooms[this.state.location]
		var log;
		if (location[direction] === 'win') {
			log = 'YOU WIN!'
		} else if (location[direction]) {
			var newRoom = rooms[location[direction]]
			this.setState({
				location: location[direction],
				visitedRooms: this.state.visitedRooms.concat(location.id)
			}, () => {
				if (location.enemy && this.state.visitedRooms.indexOf(newRoom.id) === -1) {
					setTimeout(this.doBattle, 1000)
				} else {
					setTimeout(this.displaySurroundings, 1000)
				}
			});
			log = 'You go ' + direction + '...';
		} else {
			log = 'You can\'t go that way! Try looking around for a way out...';
		}
		this.setState({
			display: log,
			adventureLog: this.state.adventureLog.concat(log)
		})
	}
	searchRoom() {
		var location = rooms[this.state.location]
		var item = location.item;
		var log;
		if (!item || this.state.lootedRooms.indexOf(location.id) !== -1) {
			log = `You do not find anything useful in this room`
		} else if (item === 'potion') {
			this.setState({
				inventory: this.state.inventory.concat([item]),
				lootedRooms: this.state.lootedRooms.concat(this.state.location.id)
			});
			log = `You found a Health Potion!  It has been added to your inventory.  Drink it to fully replenish your health!`;
		} else if (item === 'sword') {
			this.setState({
				attack: 15
			})
			log = `You found a magic sword!  Your attack power has incresed!`
		}
		this.setState({
			display: log,
			adventureLog: this.state.adventureLog.concat(log)
		})
	}
	takePotion() {
		var potionIndex = this.state.inventory.indexOf('potion');
		var log;
		if (potionIndex === -1) {
			log = `You do not have any potions.  SEARCH around for one...`;
			this.setState({
				display: log,
				adventureLog: this.state.adventureLog.concat(log)
			})
		} else {
			log = `You drink the mysterious potion and feel revitalized!`
			this.setState({
				health: 100,
				display: log,
				adventureLog: this.state.adventureLog.concat(log)
			})
		}
	}
	render() {
		var location = rooms[this.state.location]
		var stats = {
			health: this.state.health,
			gold: this.state.gold,
			attack: this.state.attack,
			inventory: this.state.inventory
		};
		var currentLog = this.state.inBattle ? this.state.battleLog : this.state.adventureLog 
		return (
			<div>
				<Title user={this.state.userName} saveGame={this.saveGame} />
				{this.state.loggingIn ? <LoginScreen logIn={this.logIn} /> :
					<div>
						<div id='leftPanel'>
							{!this.state.inBattle && 
								<CommandButtons 
									displaySurroundings={this.displaySurroundings} 
									searchRoom={this.searchRoom} 
									takePotion={this.takePotion} 
									changeRoom={this.changeRoom} 
								/>
							}
						</div>
						<div id='centerPanel' onKeyPress={this.handleKeypress} >
							{this.state.alive ?
								<div> 
									{!this.state.inBattle ? 
										<DisplayScreen displayText={this.state.display} /> : 
										<BattleScreen 
											enemy={villians[location.enemy]}
											loseHealth={this.loseHealth}
											addToLog={this.addToBattleLog}
											winBattle={this.winBattle}
											attack={this.state.attack}
										/>
									} 
									<Log log={currentLog} />
								</div> : 
								<LoseScreen />
							}
						</div>
						<div id='rightPanel'>
							<HealthBar health={this.state.health} />
						</div>
					</div>
				}
			</div>
		)
	}
}

export default App;
