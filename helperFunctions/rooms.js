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
		south: 'firstRoom',
		enemy: 'goblin'
	},
	thirdRoom: {
		surroundings: 'Something something something3...',
		north: 'forthRoom',
		west: null,
		east: 'secondRoom',
		south: null
	},
	forthRoom: {
		surroundings: 'The floor is missing and you plummet to your doom!',
		north: null,
		west: null,
		east: null,
		south: 'thirdRoom',
		instantDeath: true
	},
	fifthRoom: {
		surroundings: 'Something something something5...',
		north: 'sixthRoom',
		west: 'secondRoom',
		east: null,
		south: null,
		enemy: 'goblin'
	},
	sixthRoom: {
		surroundings: 'Something something something6...',
		north: 'eighthRoom',
		west: 'seventhRoom',
		east: null,
		south: 'fifthRoom'
	},
	seventhRoom: {
		surroundings: 'The door locks behind you and the walls rush inward to crush you flat!  You perish...',
		north: 'null',
		west: null,
		east: 'sixthRoom',
		south: null,
		instantDeath: true
	},
	eighthRoom: {
		surroundings: 'Something something something8...',
		north: 'twelfthRoom',
		west: 'ninthRoom',
		east: null,
		south: 'sixthRoom',
		enemy: 'troll'
	},
	ninthRoom: {
		surroundings: 'Something something something9...',
		north: 'thirteenthRoom',
		west: 'tenthRoom',
		east: 'eighthRoom',
		south: null,
		enemy: 'goblin'
	},
	tenthRoom: {
		surroundings: 'Something something something10...',
		north: 'eleventhRoom',
		west: null,
		east: 'ninthRoom',
		south: null
	},
	eleventhRoom: {
		surroundings: 'Oh no!  Poison gas quickly fills the room and spears shoot from holes in the wall!  You don\'t make it...',
		north: null,
		west: null,
		east: null,
		south: 'tenthRoom',
		instantDeath: true
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