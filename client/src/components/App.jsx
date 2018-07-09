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
			location: rooms.firstRoom,
			alive: true,
			health: 100,
			loggingIn: true,
			gold: 0,
			attack: 10,
			inventory: [],
			inBattle: false,
			newBattleLogEntry: '',
			visitedRooms: [],
			lootedRooms: []
		};
		this.logIn = this.logIn.bind(this);
		this.changeRoom = this.changeRoom.bind(this);
		this.displaySurroundings = this.displaySurroundings.bind(this);
		this.lose = this.lose.bind(this);
		this.doBattle = this.doBattle.bind(this);
		this.battleLoop = this.battleLoop.bind(this);
		this.winBattle = this.winBattle.bind(this);
		this.searchRoom = this.searchRoom.bind(this);
		this.takePotion = this.takePotion.bind(this);
		this.loseHealth = this.loseHealth.bind(this);
		this.addToBattleLog = this.addToBattleLog.bind(this);
	}
	logIn(state, newUser) {
		if (!newUser) {
			this.setState(state)
		}
		this.setState({
			loggingIn: false
		})
	}
	lose() {
		this.setState({
			alive: false
		})
	}
	displaySurroundings() {
		var log = this.state.location.surroundings
		this.setState({
			display: log,
			adventureLog: this.state.adventureLog.concat(log)
		}, () => {
			if (this.state.location.instantDeath) {
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
		var log = `You are attacked by a ${villians[this.state.location.enemy].class}!  You engage in battle!!!`;
		this.setState({
			display: log,
			adventureLog: this.state.adventureLog.concat(log) 
		}, () => {
			setTimeout(() => this.setState({inBattle: true}), 2000);
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
				setTimeout(this.lose, 2000)
			})
		} else {
			var randy = Math.floor(Math.random() * 100);
			var log;
			if (randy > 90) {
				var damage = this.state.attack * 2;
				log = `A critical hit!  You clobber the ${enemy} for ${damage} damage!`
				this.setState({
					display: log,
					battleLog: this.state.battleLog.concat(log),
					enemyHealth: this.state.enemyHealth - damage
				}, () => {
					setTimeout(this.battleLoop, 2500);
				})
			} else if (randy < 40) {
				log = `You are struck by the ${enemy}!  You lose ${enemyAttack} health...`
				this.setState({
					display: log,
					battleLog: this.state.battleLog.concat(log),
					health: this.state.health - enemyAttack
				}, () => {
					setTimeout(this.battleLoop, 2500);
				})
			} else {
				var damage = this.state.attack;
				log = `You landed a hit on the ${enemy} for ${damage} damage!`;
				this.setState({
					display: log,
					battleLog: this.state.battleLog.concat(log),
					enemyHealth: this.state.enemyHealth - damage
				}, () => {
					setTimeout(this.battleLoop, 2500);
				})
			}
		}
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
		var log;
		if (this.state.location[direction] === 'win') {
			log = 'YOU WIN!'
		} else if (this.state.location[direction]) {
			var newRoom = rooms[this.state.location[direction]]
			this.setState({
				location: newRoom,
				visitedRooms: this.state.visitedRooms.concat(this.state.location.id)
			}, () => {
				if (this.state.location.enemy && this.state.visitedRooms.indexOf(newRoom.id) === -1) {
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
		var item = this.state.location.item;
		var log;
		if (!item || this.state.lootedRooms.indexOf(this.state.location.id) !== -1) {
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
		var stats = {
			health: this.state.health,
			gold: this.state.gold,
			attack: this.state.attack,
			inventory: this.state.inventory
		};
		var currentLog = this.state.inBattle ? this.state.battleLog : this.state.adventureLog 
		return (
			<div>
				<Title />
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
											enemy={villians[this.state.location.enemy]}
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
