import React from 'react';

const Log = (props) => {
	var reversedLog = [];
	props.log.forEach(entry => {
		if (entry.length > 120) {
			entry = entry.slice(0, 120) + '...';
		}
		reversedLog.unshift(<div className='logEntry'>{entry}</div>)
	});
	reversedLog[0] = <div className='firstLogEntry'>{props.log[props.log.length - 1]}</div>
	return (
		<div id='log' >
			{props.log.length > 0 && reversedLog}
		</div>
	)
}

export default Log;