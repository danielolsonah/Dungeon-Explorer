import React from 'react';

const HealthBar = props => {
	var greyHealth = [];
	var redHealth = [];
	for (var i = 0; i < (100 - props.health); i++) {
		greyHealth.push(<div className='greyHealth'></div>);
	}
	for (var i = 0; i < props.health; i++) {
		redHealth.push(<div className='redHealth'></div>)
	}
	return (
		<div>
			<div className="healthBar">
				{greyHealth}
				{redHealth}
			</div>
			Health:  {props.health}/100
		</div>
	)
}

export default HealthBar;