import React from 'react';

const items = require('../../../helperFunctions/items.js');

class Inventory extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			open: this.props.open
		}
	}
	render() {
		console.log('ITEMS:', this.props.items);
		return (
			<div id='openInventory'>
				<div className='goldDisplay'>
					<img className='itemPic goldChest' src={'gold2.jpg'} />
					<div className='goldCount'>{this.props.gold}</div>
				</div>
				{this.props.items.map(item => (
					<div className='itemPic' >
						<img className='itemPic' src={items[item].pic} />
					</div>
				))}
			</div>
		)
	}
}

export default Inventory;