import React from 'react';

const DisplayScreen = props => {
	//var mode = props.inBattle ? 'Combat Mode' : 'Adventure Mode';
	return (
		<div id='displayScreen'>
			<div id='displayText'>{props.displayText}</div>
		</div>
	)
}

export default DisplayScreen;

//<div id='displayTitle'>{mode}</div>
