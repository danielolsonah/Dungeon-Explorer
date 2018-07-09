import React from 'react';
import HealthBar from './HealthBar.jsx';

const villians = require('../../../helperFunctions/villians.js');

class BattleScreen extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			enemy: this.props.enemy,
			enemyHealth: this.props.enemy.health,
			yourTurn: true,
			attack: this.props.attack,
			battleOver: false
		}
		this.attack = this.attack.bind(this);
		this.finishBattle = this.finishBattle.bind(this);
		this.getAttacked = this.getAttacked.bind(this);
	}
	attack() {
		this.setState({
			yourTurn: false
		})
		var randy = Math.ceil(Math.random() * 100);
		var start = `You attack the ${this.state.enemy.class} with your sword`;
		if (randy > 90) {
			var result = `It's a critical hit!`;
			var damage = this.state.attack * 2;
		} else if (randy < 5) {
			var result = `You miss completely...`;
			var damage = 0;
		} else {
			var result = `The attack finds it's mark`;
			var damage = this.state.attack;
		}
		this.props.addToLog(start);
		var victorious = this.state.enemyHealth - damage <= 0 ? true : false;
		setTimeout(() => {
			this.setState({
				enemyHealth: this.state.enemyHealth - damage,
				yourTurn: false
			})
			this.props.addToLog(result);
			if (victorious) {
				this.props.addToLog(`You are victorious!`);
				this.setState({
					battleOver: true
				})
			} else {
				this.getAttacked();
			}
		}, 1000)
	}
	getAttacked() {
		var randy = Math.ceil(Math.random() * 100);
		var damage = randy < 95 ? this.state.enemy.attack : this.state.enemy.attack * 2;
		var start = `The ${this.state.enemy.class} attacks...`;
		var result = randy < 95 ? `You take ${damage} damage` : `Critical Hit! You take ${damage} damage`;
		setTimeout(() => {
			this.props.addToLog(start)
			setTimeout(() => {
				this.props.addToLog(result);
				this.props.loseHealth(damage);
				this.setState({
					yourTurn: true
				})
			}, 1000)
		}, 1000)
	}
	finishBattle() {
		var randy = Math.ceil(Math.random() * 20) * this.state.enemy.weight;
		var summary = `You have defeated the ${this.state.enemy.class}!  You earned ${randy} gold!!`;
		this.props.winBattle(summary, randy);
	}
	render() {
		var style = {
			height: `5px`,
			background: 'red',
			width: `${(this.state.enemyHealth/this.state.enemy.health) * 90}%`,
			margin: '10px 5px'
		}
		return (
			<div id='battleScreen'>
				<div id='enemyHealthBar'>
					Health
					<div style={style}>
					</div>
					{this.state.enemyHealth}/{this.state.enemy.health}
				</div>
				<div id='combatButtons'>
					{this.state.yourTurn && 
						<div className='combatButton' onClick={this.attack}>Attack</div>
					}
					{this.state.battleOver &&
						<div id='battleWin' onClick={this.finishBattle}>
						Continue
						</div>
					}
				</div>
				<div id='villianPic'>
					<img src='goblin.jpg' />
					{this.state.yourTurn && <div id='yourMove'>Your Move...</div>}
				</div>
			</div>
		)
	}
}

export default BattleScreen;