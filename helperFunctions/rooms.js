module.exports = {
	firstRoom: {
		surroundings: 'You find yourself in a dark dungeon.  Cold damp stone walls surround you, but you see a wooden door to the north.',
		north: 'secondRoom',
		west: null,
		east: null,
		south: null
	},
	secondRoom: {
		surroundings: 'From the light of the torches on the wall, you can see pale, white bones scattered on the stone floor.  There is a door to the West and another to the East.',
		north: null,
		west: 'thirdRoom',
		east: 'fifthRoom',
		south: 'firstRoom'
	},
	thirdRoom: {
		surroundings: 'Something something something3...',
		north: 'forthRoom',
		west: null,
		east: 'secondRoom',
		south: null
	},
	forthRoom: {
		surroundings: 'Something something something4...',
		north: null,
		west: null,
		east: null,
		south: 'thirdRoom'
	},
	fifthRoom: {
		surroundings: 'Something something something5...',
		north: 'sixthRoom',
		west: 'secondRoom',
		east: null,
		south: null
	},
	sixthRoom: {
		surroundings: 'Something something something6...',
		north: 'eighthRoom',
		west: 'seventhRoom',
		east: null,
		south: 'fifthRoom'
	},
	seventhRoom: {
		surroundings: 'Something something something7...',
		north: 'null',
		west: null,
		east: 'sixthRoom',
		south: null
	},
	eighthRoom: {
		surroundings: 'Something something something8...',
		north: 'twelfthRoom',
		west: 'ninthRoom',
		east: null,
		south: 'sixthRoom'
	},
	ninthRoom: {
		surroundings: 'Something something something9...',
		north: 'thirteenthRoom',
		west: 'tenthRoom',
		east: 'eighthRoom',
		south: null
	},
	tenthRoom: {
		surroundings: 'Something something something10...',
		north: 'eleventhRoom',
		west: null,
		east: 'ninthRoom',
		south: null
	},
	eleventhRoom: {
		surroundings: 'Something something something11...',
		north: null,
		west: null,
		east: null,
		south: 'tenthRoom'
	},
	twelfthRoom: {
		surroundings: 'Something something something12...',
		north: null,
		west: null,
		east: null,
		south: 'eighthRoom'
	},
	thirteenthRoom: {
		surroundings: 'Something something something13...',
		north: 'win',
		west: null,
		east: null,
		south: 'ninthRoom'
	}
}