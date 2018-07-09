import React from 'react';

const Stats = props => (
	<div id='stats'>
		<table>
			<tBody>
				{Object.keys(props.stats).slice().map(stat => (
					<tr>
						<td>{stat}</td>
						<td>{props.stats[stat]}</td>
					</tr>
				))}
			</tBody>
		</table>
	</div>
)

export default Stats;