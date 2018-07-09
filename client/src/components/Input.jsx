import React from 'react';

class Input extends React.Component{
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div id='inputField'>
				<input id='textField' type='text' value={this.props.value} onChange={this.props.onChange} /> 
				<button id='commandButton' onClick={this.props.handleClick} >GO</button>
			</div>
		)
	}
}

export default Input;