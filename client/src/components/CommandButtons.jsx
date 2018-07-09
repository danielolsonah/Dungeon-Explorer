import React from 'react';

const CommandButtons = (props) => {
	return (
		<div>
			<div className='commandButton button' onClick={props.displaySurroundings} >
				Look Around
			</div>
			<div className='commandButton button' onClick={props.searchRoom}>
				Search Room
			</div>
			<div className='commandButton button' onClick={props.takePotion}>
				Drink Potion
			</div>
			<div className='northSouthButton button' onClick={() => props.changeRoom('north')}>
				North
			</div>
			<div className='westButton button' onClick={() => props.changeRoom('west')}>
				West
			</div>
			<div className='eastButton button' onClick={() => props.changeRoom('east')}>
				East
			</div>
			<div className='northSouthButton button' onClick={() => props.changeRoom('south')}>
				South
			</div>
		</div>
	)
}

export default CommandButtons;