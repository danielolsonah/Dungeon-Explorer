import React from 'react';
import HealthBar from './HealthBar.jsx';
import Sound from 'react-sound';

const helpers = require('../../../helperFunctions/helpers.js');
const villians = require('../../../helperFunctions/villians.js');

class BattleScreen extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			enemy: this.props.enemy,
			enemyHealth: this.props.enemy.health,
			yourTurn: true,
			attack: this.props.attack,
			battleOver: false,
			attacking: false,
			groan: false
		}
		this.attack = this.attack.bind(this);
		this.finishBattle = this.finishBattle.bind(this);
		this.getAttacked = this.getAttacked.bind(this);
		this.stopAttacking = this.stopAttacking.bind(this);
		this.stopGroaning = this.stopGroaning.bind(this);
	}
	attack() {
		this.setState({
			yourTurn: false,
			attacking: true
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
			var result = `Your attack is successful`;
			var damage = this.state.attack;
		}
		this.props.addToLog(start);
		var victorious = this.state.enemyHealth - damage <= 0 ? true : false;
		setTimeout(() => {
			this.setState({
				enemyHealth: this.state.enemyHealth - damage,
				yourTurn: false,
			})
			this.props.addToLog(result);
			if (victorious) {
				this.props.addToLog(`You are victorious!`);
				this.setState({
					battleOver: true,
					groan: true
				})
			} else {
				this.getAttacked();
			}
		}, 1000)
	}
	getAttacked() {
		var damage = helpers.randomRange(this.state.enemy.attack - 5, this.state.enemy.attack);
		var start = `The ${this.state.enemy.class} attacks...`;
		var result = `You take ${damage} damage`;
		setTimeout(() => {
			this.props.addToLog(start)
			setTimeout(() => {
				this.props.addToLog(result);
				this.setState({
					attacking: true
				})
				if (this.props.health - damage <= 0) {
					setTimeout(this.props.lose, 1000)
				} else{
					this.setState({
						yourTurn: true
					})
				}
				this.props.loseHealth(damage);
			}, 1000)
		}, 1000)
	}
	finishBattle() {
		var randy = Math.ceil(Math.random() * 20) * this.state.enemy.weight;
		var summary = `You have defeated the ${this.state.enemy.class}!  You earned ${randy} gold!!`;
		this.props.winBattle(summary, randy);
	}
	stopAttacking() {
		this.setState({
			attacking: false
		})
	}
	stopGroaning() {
		this.setState({
			groan: false
		})
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
				{this.state.attacking && 
					<Sound 
						url={!this.state.yourTurn ? 'steelsword.mp3' : 'slap.mp3'} 
						playStatus={Sound.status.PLAYING}
						onFinishedPlaying={this.stopAttacking}
					/>
				}
				{this.state.groan && 
					<Sound
						url='black.mp3'
						playStatus={Sound.status.PLAYING}
						onFinishedPlaying={this.stopGroaning}
					/> 
				}
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
					<div id='enemyTitle'>
						{this.state.enemy.class}
					</div>
					<img src={this.state.enemy.pic} />
					{this.state.yourTurn && <div id='yourMove'>Your Move...</div>}
				</div>
			</div>
		)
	}
}

export default BattleScreen;